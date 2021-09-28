
const styles = {
    a: {
        fontSize: '0.8rem',
    }
}
export default function SignUp() {
    return (
        <div  className = 'container col-md-5'>
        <div className = 'card mt-5 p-4'  >
            <form className ='p-2'>
                <h3 className ='d-flex justify-content-center'>Đăng ký</h3>
                <div className="form-group ">
                    <label>Tài khoản</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group mt-2">
                    <label>Mật khẩu</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group mt-2">
                    <label>Nhập lại khẩu</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className = 'd-flex justify-content-center mt-2'>
                <button type="submit" className="btn btn-primary btn-block mt-2">Đăng ký</button>
                </div>
                <a href="/login" style={styles.a}>Đăng nhập</a>
            </form>
        </div>
    </div>
    );
}