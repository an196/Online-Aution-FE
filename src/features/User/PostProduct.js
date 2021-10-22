import { Form, Row, Col, Button, InputGroup, Container } from 'react-bootstrap';
import UserNavBar from '../../components/UserNavBar';
import * as yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { useEffect, useState, Component } from 'react';
import PropTypes from 'prop-types';
import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getCategories, selectCategories } from '../product/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { formatDateTime } from '../../utils/utils';
import { NotifyHelper } from '../../helper/NotifyHelper';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const schema = yup.object().shape({
    productName: yup.string().required(),

});

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

/* 
 * PropType validation
 */
const propTypes = {
    placeholder: PropTypes.string,
}

const metadata = {
    contentType: 'image/jpeg'
};

export default function PostProduct() {
    const [state, setstate] = useState({ editorHtml: '' });
    const [categorySelected, setcategorySelected] = useState(1);
    const dispatch = useDispatch();
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    //decription
    const [description, setDescription] = useState("");
    const [autoRenew, setAutoRenew] = useState(0);

    //upload imge
    const [mainImage, setMainImage] = useState(null);
    const [extra1Image, setExtra1Image] = useState(null);
    const [extra2Image, setExtra2Image] = useState(null);
    const [extra3Image, setExtra3Image] = useState(null);
    const [stepCost, setStepCost] = useState(1000);
    const [progress, setProgress] = useState(0);
    const [urlMainImage, setUrlMainImage] = useState();
    const [urlExtra1Image, setUrlExtra1Image] = useState();
    const [urlExtra2Image, setUrlExtra2Image] = useState();
    const [urlExtra3Image, setUrlExtra3Image] = useState();


    //define categories
    const categories = useSelector(selectCategories);

    async function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();


        const form = e.currentTarget;
        if (form.checkValidity()) {
            const currentTime = new Date();

            if (startDate.getDate() <= currentTime.getDate()) {
                NotifyHelper.error('Ngày bắt đầu đấu giá phải lớn hơn ngày hiện tại', 'Thông báo');
                return;
            }
            const productName = e.target.productName.value;
            const category_id = categorySelected;

            const start_cost = e.target.start_cost.value;
            const step_cost = stepCost;
            const buy_now = e.target.but_now.value ? e.target.but_now.value : null;
            const start_day = formatDateTime(startDate);

            //caculate end day
            var myDate = startDate;
            myDate.setDate(myDate.getDate() + 7);
            const end_day = formatDateTime(myDate);


            const urlImg = mainImage + ',' + extra1Image + ',' + extra2Image + ',' + extra3Image;
            //up img to firebase

            //create data to post
            const data = {
                name: productName,
                category_id: category_id,
                image: urlImg,
                start_cost: Number(start_cost),
                step_cost: Number(step_cost),
                buy_now: 0,
                start_day: start_day,
                end_day: end_day,
                description: description,
                is_auto_renew: autoRenew,
            }

            //post data to server
            post(data);
            console.log(data)
        }
        setValidated(true);



    }




    //post
    async function post(data) {


        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;
        let config = {
            headers: { ...headers, 'Content-Type': 'application/json' }
        }
        console.log(config)
        axios
            .post("http://localhost:3002/api/seller/product", data, config)
            .then(function (res) {
                console.log('dd')
                if (res.status === 200)
                    NotifyHelper.success(res.data.message, "Thông báo")

            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });

    }

    async function upImgToFireBase(image, index) {
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'images/' + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        //console.log('Upload is paused');
                        break;
                    case 'running':
                        //console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    if (index === 1)
                        setMainImage(downloadURL);
                    if (index === 2)
                        setExtra1Image(downloadURL);
                    if (index === 3)
                        setExtra2Image(downloadURL);
                    if (index === 4)
                        setExtra3Image(downloadURL);
                });
            }
        );
    }

    //handle main image
    function handleMainImage(e) {
        if (e.target.files[0]) {
            upImgToFireBase(e.target.files[0], 1);
        }
    }

    function handleExtra1Image(e) {
        if (e.target.files[0]) {
            upImgToFireBase(e.target.files[0], 2);
        }
    }

    function handleExtra2Image(e) {
        if (e.target.files[0]) {
            upImgToFireBase(e.target.files[0], 3);
        }
    }

    function handleExtra3Image(e) {
        if (e.target.files[0]) {
            upImgToFireBase(e.target.files[0], 4);
        }
    }


    function handleCategory(event) {
        setcategorySelected(event.target.value);
    }

    function handleStepCost(event) {
        setStepCost(event.target.value);
    }

    function handleAutoRenew(event) {
        event.target.checked ? setAutoRenew(1) : setAutoRenew(0);
    }


    //get categories
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);


    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={8}>
                    <UserNavBar />
                    <Container className='p-4'>
                        <h5 className="d-flex justify-content-center mt-4">Đăng sản phẩm!</h5>
                        <Form noValidate onSubmit={handleSubmit} validated={validated} method="get" >
                            <Row className="mb-3">
                                <Form.Group as={Col} md="8" controlId="validationFormik01">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="productName"
                                        //onChange={handleChange}
                                        maxLength='255'
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" >
                                    <Form.Label>Danh mục</Form.Label>
                                    <Form.Select onChange={handleCategory} defaultValue="Chọn danh mục sản phẩm" >
                                        {categories.map(item => <option key={item.category_id} value={item.category_id}>{item.name} </option>

                                        )}
                                    </Form.Select>

                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="3" controlId="formFile" className="mb-3">
                                    <Form.Label>Ảnh chính</Form.Label>
                                    <Form.Control type="file"
                                        required
                                        name="mainImage"
                                        onChange={handleMainImage}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="formFile" className="mb-3">
                                    <Form.Label>Ảnh phụ 1</Form.Label>
                                    <Form.Control type="file"
                                        required
                                        name="extraImage1"
                                        onChange={handleExtra1Image}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="formFile" className="mb-3">
                                    <Form.Label>Ảnh phụ 2</Form.Label>
                                    <Form.Control type="file"
                                        required
                                        name="extraImage2"
                                        onChange={handleExtra2Image}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="formFile" className="mb-3">
                                    <Form.Label>Ảnh phụ 3</Form.Label>
                                    <Form.Control type="file"
                                        required
                                        name="extraImage3"
                                        onChange={handleExtra3Image}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="3" controlId="validationFormik01">
                                    <Form.Label>Giá khởi điểm</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="start_cost"
                                        // onChange={(e) => {
                                        //     handleChange("price")(e);

                                        // }}

                                        min={0} max={10000000}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationFormik01" onChange={handleStepCost}>
                                    <Form.Label>Bước giá</Form.Label>
                                    <Form.Select defaultValue="Chọn bước giá">
                                        <option value={100000}>100,000đ</option>
                                        <option value={200000}>200,000đ</option>
                                        <option value={500000}>500,000đ</option>
                                    </Form.Select>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationFormik01">
                                    <Form.Label>Giá mua ngay(nếu có)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="but_now"
                                        // onChange={(e) => {
                                        //     handleChange("but_now")(e);
                                        // }}

                                        min={0} max={10000000}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" >
                                    <Form.Label>Ngày bắt đầu đấu giá</Form.Label>
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                </Form.Group>

                            </Row>
                            <Row className='mb-3 mt-3'>
                                <Form.Group as={Col} md="3" id="formGridCheckbox">
                                    <Form.Check type="checkbox" label="Tự động gia hạn" name='auto_renew' onChange={handleAutoRenew} />
                                </Form.Group>
                            </Row>
                            <h6>Mô tả sản phẩm</h6>
                            <ReactQuill
                                onChange={setDescription}
                                value={description}
                                modules={modules}
                                formats={formats}
                                bounds={'.app'}
                                placeholder=''
                            />

                            <Row className='d-flex justify-content-center'>
                                <Button type="submit" className='mt-3 col-md-2'>Đăng bài</Button>
                            </Row>
                        </Form>
                    </Container>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}