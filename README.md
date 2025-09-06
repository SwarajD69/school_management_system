````markdown
# 🏫 School Management System (Web Development Mini Project)

A full-stack web application built with **Next.js** and **MySQL** to manage schools. This project provides:

- A responsive form page to **add new schools** to the database
- A listing page to **display all stored schools** in a clean card layout

---

## 📌 Features & Technology Stack

- **Frontend:** Next.js (React)
- **Form Handling & Validation:** react-hook-form
- **Backend/API:** Next.js API Routes (Node.js)
- **Database:** MySQL (hosted on [freesqldatabase.com](https://www.freesqldatabase.com/))
- **Image Storage:** Cloudinary ([cloudinary.com](https://cloudinary.com/))
- **Styling:** CSS / Tailwind / Bootstrap (customizable)
- **Hosting:** Vercel ([vercel.com](https://vercel.com/))

---

## 📄 Database Schema: `schools` Table

| Field    | Type                | Description            |
|----------|---------------------|------------------------|
| id       | int, AUTO_INCREMENT | Primary Key            |
| name     | text                | School Name            |
| address  | text                | School Address         |
| city     | text                | City                   |
| state    | text                | State                  |
| contact  | varchar(15)         | Contact Number         |
| image    | text                | Cloudinary Image URL   |
| email_id | text                | School Email ID        |

---

## 📃 Application Pages Overview

### 📝 `/addSchool`

- Responsive form to input school details
- Form validation (e.g., email format) implemented with **react-hook-form**
- Uploads images to **Cloudinary** and stores image URLs in the database

### 🏫 `/showSchools`

- Displays all schools in a responsive card layout
- Each card shows name, address, city, and school image (from Cloudinary URL)

---

## 📂 Application Routes

- `/addSchool` — Main page to add a new school  
- `/showSchools` — View all schools in the system  
- `/` — ❌ Not implemented (visiting this route will return an error)

> ⚠️ **Note:** The home route `/` does not exist and will show an error. Please use `/addSchool` or `/showSchools` directly.

---

## 🎯 How to Use

- Go to `/addSchool` to fill out the school form and upload an image  
- Then go to `/showSchools` to view all added schools

---

## 🚀 Getting Started (Local Setup)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SwarajD69/school_management_system.git
   cd school_management_system
````

2. **Install dependencies and configure environment variables:**

   * Install packages:

     ```bash
     npm install
     ```

   * Create a `.env.local` file in the root directory with the following content (replace with your actual credentials):

     ```env
     DB_HOST=your_freesqldatabase_host
     DB_USER=your_freesqldatabase_username
     DB_PASSWORD=your_freesqldatabase_password
     DB_NAME=your_freesqldatabase_dbname

     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000/addSchool` or `http://localhost:3000/showSchools`

---

## 🌐 Live Demo & Source Code

* **GitHub Repository:** [https://github.com/SwarajD69/school\_management\_system](https://github.com/SwarajD69/school_management_system)
* **Live Demo (Hosted on Vercel):** [https://school-management-system-47ybgk9lh-swarajd69s-projects.vercel.app/](https://school-management-system-47ybgk9lh-swarajd69s-projects.vercel.app/)

---

## ✅ Checklist

* [x] Built with **Next.js**
* [x] Uses **MySQL** database hosted on **freesqldatabase.com**
* [x] Form validation via **react-hook-form**
* [x] Image upload & storage on **Cloudinary**
* [x] Responsive UI for all pages
* [x] Hosted on **Vercel**
* [x] Public GitHub repository with source code

---

## 📬 Contact

Made with 💻 by **Swaraj D**
📧 [dhageswaraj1000@gmail.com](mailto:dhageswaraj1000@gmail.com)
🐙 [GitHub Profile](https://github.com/SwarajD69)

```
```
