---

## 📘 README.md

````markdown
# 🏫 School Management System (Web Development Mini Project)

This is a full-stack web development mini project built using **Next.js** and **MySQL**. The project includes two responsive pages:

- A form page to **add new schools** to the database
- A listing page to **display all stored schools** like an e-commerce product gallery

---

## 📌 Project Features

### 🔧 Tech Stack
- **Frontend:** Next.js (React)
- **Form Handling & Validation:** react-hook-form
- **Backend/API:** Next.js API Routes (Node.js)
- **Database:** MySQL
- **Image Storage:** Local folder `schoolImages`
- **Styling:** CSS / Tailwind / Bootstrap (as per your implementation)

---

## 📄 MySQL Table Structure

Table Name: `schools`

| Field       | Type           | Description                   |
|-------------|----------------|-------------------------------|
| id          | int (AUTO_INCREMENT) | Primary Key           |
| name        | text           | School Name                   |
| address     | text           | School Address                |
| city        | text           | City                          |
| state       | text           | State                         |
| contact     | number         | Contact Number                |
| image       | text (path)    | School Image Filename         |
| email_id    | text           | School Email ID               |

---

## 📃 Pages Overview

### 📝 `addSchool.jsx`

- A form to input school details.
- Includes:
  - Field validation (e.g., email format)
  - Responsive design for mobile and desktop
  - Uploads image to the local `schoolImages/` folder
- Built using `react-hook-form`

### 🏫 `showSchools.jsx`

- Displays schools in a **card layout** (similar to [UniformApp School Listing](https://uniformapp.in/schoolsearch.php))
- Shows:
  - School **name**
  - **Address**
  - **City**
  - **Image**
- Fully responsive

---

## 🚀 How to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/school_management_system.git
   cd school_management_system
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure the database:**

   * Set up a MySQL database
   * Create the `schools` table with the structure shown above
   * Add your DB credentials in `.env.local`:

     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=yourdbname
     ```

4. **Run the app:**

   ```bash
   npm run dev
   ```

5. Visit: `http://localhost:3000`

---

## 🌐 Live Project

🔗 **GitHub Repository:** [Click Here](https://github.com/yourusername/school_management_system)
🔗 **Live Demo:** [Click Here](https://yourdeploymenturl.vercel.app)

---

## ✅ Assignment Guidelines Followed

* [x] Used **Next.js** (React-based framework)
* [x] Used **MySQL** as the backend database
* [x] Included **react-hook-form** for validation
* [x] Stored images locally in `/schoolImages`
* [x] Created **responsive UI** for both pages
* [x] Hosted project on Vercel/Netlify
* [x] Code pushed to a **public GitHub repo**

---

## 📬 Contact

Made with 💻 by **\[Your Name]**
📧 Email: [your.email@example.com](mailto:your.email@example.com)
📍 GitHub: [@SwarajD69](https://github.com/SwarajD69)

---

````

---

## ✅ What You Should Do Next:

1. **Copy** the content above into a file named `README.md` in the root of your project folder.
2. Replace:
   - `yourusername` with your GitHub username
   - `your.email@example.com` with your actual email (optional)
   - `https://yourdeploymenturl.vercel.app` with your **live site URL**
3. Commit and push it:

   ```bash
   git add README.md
   git commit -m "Add README file"
   git push
````

Would you like me to tailor it even more (e.g., if you're using Vercel, Tailwind, etc.)?
