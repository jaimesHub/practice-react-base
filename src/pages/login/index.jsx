import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useState } from "react";
import { callLogin } from "../../services/api";

const LoginPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        // console.log('Success:', values);
        setIsSubmit(true);
        const { username, password } = values
        const res = await callLogin(username, password);

        if (res?.data) {
            message.success({
                content: "Đăng nhập thành công!",
                duration: 5,
            });

            navigate("/");
        } else {
            notification.error({
                message: res.error,
                description: res.message,
            });
        }

        setIsSubmit(false);
    };

    return (
        <>
            <div className="login-page">
                <main className="main">
                    <div className="container">
                        <section className="wrapper">
                            <div className="heading">
                                <h2 className="text text-large">Đăng nhập</h2>
                                <Divider />
                            </div>

                            <Form
                                name="basic"
                                // style={{ maxWidth: 600, margin: '0 auto' }}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    labelCol={{ span: 24 }} //whole column
                                    label="Email"
                                    name="username"
                                    rules={[{ required: true, message: 'Email không được để trống!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    labelCol={{ span: 24 }} //whole column
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                // wrapperCol={{ offset: 6, span: 16 }}
                                >
                                    <Button type="primary" htmlType="submit" loading={isSubmit}>
                                        Đăng nhập
                                    </Button>
                                </Form.Item>
                                <Divider>Or</Divider>
                                <p className="text text-normal">Chưa có tài khoản ?
                                    <span>
                                        <Link to='/register' > Đăng kí </Link>
                                    </span>
                                </p>
                            </Form>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}

export default LoginPage;