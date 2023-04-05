import {  HomeOutlined,ShoppingCartOutlined ,UsergroupDeleteOutlined,GithubOutlined} from '@ant-design/icons';
import Pedidos from '../pages/pedidosClientes/pedidosPage';
import Mascotas from '../pages/mascotas/mascotaPage';
import PedidosVendores from '../pages/pedidosVendedores/pedidosPage';
import ListadoVendedores from '../pages/listadoVendedores/listadoVendedores';
import ClienteMascotas from '../pages/clienteMascotas/clienteMascotas';

export const Consts = {
  USUARIOS: {
    ROLES: {
      VENDEDOR: 'VENDEDOR',
      CLIENTE: 'CLIENTE',
    }
  },
 
}

export const AppRoutes = [
  { 
    key: 'pedidos', 
    icon: ShoppingCartOutlined, 
    link: '/pedidos', 
    path: '/pedidos/*',
    title: 'PEDIDOS', 
    element: <Pedidos />,
    roles: [Consts.USUARIOS.ROLES.CLIENTE],
  },
  { 
    key: 'mascota', 
    icon: GithubOutlined, 
    link: '/mascota', 
    path: '/mascota/*',
    title: 'MASCOTAS', 
    element: <Mascotas />,
    roles: [Consts.USUARIOS.ROLES.CLIENTE],
  },
  { 
    key: 'pedidos', 
    icon: ShoppingCartOutlined, 
    link: '/pedidos', 
    path: '/pedidos/*',
    title: 'PEDIDOS', 
    element: <PedidosVendores />,
    roles: [Consts.USUARIOS.ROLES.VENDEDOR],
  },
  { 
    key: 'vendedor', 
    icon: UsergroupDeleteOutlined, 
    link: '/vendedor', 
    path: '/vendedor/*',
    title: 'VENDEDORES', 
    element: <ListadoVendedores />,
    roles: [Consts.USUARIOS.ROLES.VENDEDOR],
  },
  { 
    key: 'mascotasdueno', 
    icon: GithubOutlined, 
    link: '/mascotadueno', 
    path: '/mascotadueno/*',
    title: 'MASCOTAS/DUEÑOS', 
    element: <ClienteMascotas />,
    roles: [Consts.USUARIOS.ROLES.VENDEDOR],
  },
  
]