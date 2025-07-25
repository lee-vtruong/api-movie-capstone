import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/settings/config";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import {
  MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, UserOutlined,
  VideoCameraOutlined, FundProjectionScreenOutlined
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  const navigate = useNavigate();
  const { token: { colorBgContainer } } = theme.useToken();

  useEffect(() => {
    if (!localStorage.getItem(USER_LOGIN)) {
      toast.error('Bạn cần đăng nhập để truy cập trang này!');
      navigate('/login');
    }
  }, [navigate]);

  if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
    toast.error('Bạn không có quyền truy cập vào trang quản trị!');
    return <Navigate to="/" />;
  }

  const handleLogout = () => {
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = '/';
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout} danger>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <div className="flex items-center justify-center p-4">
          <NavLink to="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 text-cyan-400">
              <path d="M27.912 7.289..."/>
              <path d="M22.094 19.451..."/>
            </svg>
            {!collapsed && <span className="text-white text-xl font-bold">Cyber-Movie</span>}
          </NavLink>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<VideoCameraOutlined />}>
            <NavLink to="/admin/films">Quản lý Phim</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <NavLink to="/admin/users">Quản lý Users</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} className="flex justify-between items-center pr-5">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()} className="flex items-center space-x-3 cursor-pointer">
              <Avatar size="large" style={{ backgroundColor: '#08979c' }} icon={<UserOutlined />} />
              <span className="font-semibold text-gray-700">{userLogin.taiKhoan}</span>
            </a>
          </Dropdown>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: '8px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};