export default {
    items: [
      {
        name: 'Dashboard',
        url: '/',  
      },
      {
        name: 'Order Product',
        url: 'orderProduct',
      },
      {
        name: 'Add Product',
        url: 'addProduct',
      },

      {
        name: 'View Product',
        url: 'viewProduct',
      },

      {
        name: 'Add Brand',
        url: 'addBrand',
      },

      {
        name: 'View Brand',
        url: 'viewBrand',
      },
      {
        name: 'View Employee',
        url: 'viewEmployee',
      },
      {
        name: 'Add Employee',
        url: 'addEmployee',
      },
      
      {
        name: 'View Report',
        url: '#',
        children: [
          {
            name: 'Monthly Sales Report - Brand',
            url: '#',
          },
          {
            name: 'Monthly Sales Report - Product',
            url: '#',
          },
          {
            name: 'Monthly Sales Report - Employee',
            url: '/404',
            icon: 'icon-star',
          },
          
        ],
      },
      
    ],
  };
  