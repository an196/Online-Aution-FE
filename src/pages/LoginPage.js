import React, { Component } from "react";

const styles = {
    a: {
        fontSize: '0.8rem',
    }
}

export default function Login() {
    return (

        <div  className = 'container col-md-5'>
            <div className = 'card  mt-5 p-4'  >
                <form className ='p-2'>
                    <h3 className ='d-flex justify-content-center'>Đăng nhập</h3>
                    <div className="form-group ">
                        <label>Tài khoản</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group mt-2">
                        <label>Mật khẩu</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    {/* <div className="form-group mt-2">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Nhớ mật khẩu</label>
                        </div>
                    </div> */}
                    <div className = 'd-flex justify-content-center mt-4'>
                    <button type="submit" className="btn btn-primary btn-block ">Đăng nhập</button>
                    </div>
                    
                    <p className="forgot-password text-right mt-3" style={styles.a}>
                        Quên <a href="sigup" >mật khẩu?</a>
                        &nbsp;
                        <a href="sigup">Đăng ký</a>
                    </p>
                    
                </form>
            </div>
        </div>
    );

}