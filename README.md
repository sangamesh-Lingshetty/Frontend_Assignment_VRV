# 🚀 Role-Based Access Control (RBAC) UI

![RBAC UI Banner](https://via.placeholder.com/1200x300.png?text=Role-Based+Access+Control+UI)  
*A robust and secure system for managing users, roles, and permissions.*

---

## 🔐 Admin Authentication

This project includes **strong authentication** to ensure only authorized admin users can access the dashboard.  
To log in, you must provide the correct **name**, **password**, and **role**:  

| **Field**   | **Value**          |
|-------------|--------------------|
| Name        | `VRV Security`    |
| Password    | `AdminLogin`      |
| Role        | `Admin` (Dropdown) |

🔴 *Access is restricted if any of these fields are incorrect.*

---

## 🌟 Features

### 1️⃣ User Management
- 📝 **CRUD Operations**: Create, Read, Update, and Delete users.  
- 🔍 **Filter Option**: Filter users dynamically based on needs.  
- 📂 **Mock API**: Integrated using `json-server`, storing data in the `db.json` file.  

### 2️⃣ Role Management
- ➕ **Add Roles**: Create new roles for users.  
- ✏️ **Edit Roles**: Modify existing roles.  
- 🗑️ **Delete Roles**: Remove unwanted roles.  
- 🔄 **Assign Roles**: Dynamically assign roles to users.  

### 3️⃣ Permission Management
- ✅ **Custom Permissions**: Define specific permissions for roles.  
- 🔧 **Dynamic Permissions**: Supports **read**, **write**, **update**, and **delete** actions.  

### 4️⃣ Responsive Design
- 🎨 **Built with Tailwind CSS**: A sleek and modern UI.  
- 📱 **Mobile-Friendly**: Fully responsive across devices.  

### 5️⃣ Security
- 🔒 **JWT Authentication**: Secure user validation and session handling.  
- 🛡️ **Admin-Only Access**: Restricted to authorized admin users.  

---

## 🚀 Technologies Used

| **Category**        | **Technologies**         |
|---------------------|--------------------------|
| **Frontend**        | React.js                |
| **Styling**         | Tailwind CSS            |
| **Authentication**  | JWT (JSON Web Token)    |
| **Mock API**        | json-server             |

---

## 🛠️ Setup Instructions

### Prerequisites
- 📥 Install [Node.js](https://nodejs.org/).
- 📥 Install `json-server` globally:
  ```bash
  npm install -g json-server
