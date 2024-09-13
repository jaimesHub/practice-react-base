import { Button, Divider, Form, Input } from "antd";

const Register = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(">>> values: ", values);
        form.resetFields();
    }
    return (
        <div className="register-page" style={{ padding: '50px' }}>
            <h3 style={{ textAlign: "center" }}>Register Page</h3>
            <Divider />
            <Form
                form={form}
                name="register"
                labelCol={{ span: 6 }}
                style={{ maxWidth: 600, margin: "0 auto" }}
                initialValues={{
                    fullName: "",
                    email: "",
                    password: "",
                    phone: "",
                }}
                onFinish={(e) => onFinish(e)}
            >
                <Form.Item
                    name="fullName"
                    label="Full name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Full name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 6, span: 16 }}
                >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;