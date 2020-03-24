# Under construction

This project is designed for small bussiness client. 

The features include product save/update/delete/search.

Primary data analysis include monthly/seasonal sales data viewing.

# Front-end Part

The front end is implemented with React, React Bootstrap, Sematic UI React

### Components

#### App.js

Contains nav-bar side-bar and router to other component

#### nav-bar.js

Using recursive rendering, if you want to change the content, just change the ./component/_nav.js file

By clicking the nav brand, viewSideBar() will be called, and this will change side bar visibility.

#### side-bar.js

Side bar visibility can be changed by calling viewSideBar() in App.js. Side bar items are imported through ./component/_sidebar.js file

# Back-end Part

The front end is implemented with Springboot, JPA, Hibernate, Spring Security, Lombok


# Database Part

DBMS MySQL

ERD

# Testing

#### front-end

Selenium WebDriver

#### back-end

Junit