import React, { useState } from 'react';
import { Button, Input, Typography, Card, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';
import { saveUserToStorage } from '../../utils/localStorage';
import toast from '../../utils/toast';

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      await saveUserToStorage(user);
      navigate('/dashboard', { replace: true });
      navigate(0);
    } catch (err) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            width: 400,
            backgroundColor: '#1f1f1f',
            color: '#fff',
            marginTop: 100,
          }}
        >
          <Title level={3} style={{ color: '#fff', textAlign: 'center' }}>
            Log In
          </Title>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Button
            type="primary"
            block
            onClick={handleLogin}
            loading={loading}
            disabled={!email || !password}
          >
            Log In
          </Button>
          <Button
            type="link"
            block
            onClick={() => navigate('/signup')}
            style={{ marginTop: 10 }}
          >
            Don't have an account?
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
