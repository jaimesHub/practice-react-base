import { Button, Divider, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { useState } from 'react';
import { registerAPI } from '../../services/api.service';

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true);

        const { fullName, email, password, phone } = values;

        const res = await registerAPI(fullName, email, password, phone);

        if (res.data) {
            notification.success({
                message: "Successfully!",
                description: "Đăng ký tài khoản thành công!"
            });

            form.resetFields();

            setIsLoading(false);

            navigate("/login");
        } else {
            notification.error({
                message: "Failure!",
                description: `Đăng ký tài khoản thất bại: ${JSON.stringify(res)}`
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="register-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
                            <Divider />
                        </div>

                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Họ tên"
                                name="fullName"
                                rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{ offset: 10, span: 12 }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isLoading}
                                    onClick={() => form.submit()}
                                >
                                    Đăng ký
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal">Đã có tài khoản ?
                                <span>
                                    <Link to='/login' > Đăng Nhập </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default RegisterPage;
