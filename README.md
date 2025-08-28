# 💰 Expense Tracker

An **Expense Tracking Web Application** built with **Spring Boot (Java)** on the backend and **HTML, CSS, JavaScript, Chart.js** on the frontend.  
This project helps users **track, manage, and visualize** their expenses with category-wise distribution and filtering options.



## 🚀 Features

- 📌 Add, edit, and delete expenses  
- 📅 Filter expenses by **month** and **category**  
- 📊 Visualize expenses with a **dynamic Pie/Doughnut chart** using Chart.js  
- 💵 Auto-calculated **total expense** display  
- 🎨 Clean & responsive UI with styled tables and buttons  
- 🔄 Real-time data updates (AJAX Fetch API, no page reloads)  



## 🛠️ Tech Stack

### **Frontend**
- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Chart.js (for expense charts)

### **Backend**
- Java Spring Boot  
- Spring Web (REST APIs)  
- Spring Data JPA (ORM)  
- Hibernate  

### **Database**
- MySQL 

### **Other Tools**
- Maven (dependency management)  
- Git & GitHub (version control)  




## 📂 Project Structure

```
expense-tracker/
│
├── backend/                  # Spring Boot backend
│   ├── src/main/java/com/track
│   │   ├── controller/       # REST Controllers
│   │   ├── model/            # Entity classes
│   │   ├── repository/       # JPA Repositories
│   │   └── service/          # Service Layer
│   └── resources/
│       └── application.properties
│
├── frontend/                 # Static frontend files
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md                 # Project documentation
```


## ⚡ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Shanmukh-235/ExpenseTracker.git
cd ExpenseTracker
```

### 2️⃣ Backend Setup (Spring Boot)
- Open the project in **IntelliJ IDEA / Eclipse**  
- Configure your **MySQL/Postgres** database in `application.properties`  
- Run the application:

```bash
mvn spring-boot:run
```

Backend will start at: **http://localhost:8080**

### 3️⃣ Frontend Setup
- Open `index.html` in your browser (or use VS Code Live Server)  
- Make sure API URL in `script.js` matches your backend URL:
```javascript
const API_URL = "http://localhost:8080/api/expenses";
```
## 🗄️ Database Setup

### 1️⃣ Create Database
```sql
CREATE DATABASE expense_tracker;
```
### 2️⃣ Select Database
```sql
USE expense_tracker;
````
### 3️⃣ Create Table (Optional, beacuse Hibernate will generate the table with Class name Automatically)
```sql
CREATE TABLE expenses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL
);
```
### 4️⃣ Insert Sample Data
```sql
INSERT INTO expenses (amount, category, description, date)
VALUES (500.00, 'Food', 'Dinner at restaurant', '2025-08-01');
```
### 5️⃣ View Expenses
```sql
SELECT * FROM expenses;
```

## 📊 API Endpoints

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/api/expenses`      | Get all expenses         |
| POST   | `/api/expenses`      | Add a new expense        |
| PUT    | `/api/expenses/{id}` | Update an existing expense |
| DELETE | `/api/expenses/{id}` | Delete an expense        |



## 🌟 Future Enhancements
- 🔑 User Authentication (Login & Signup)  
- 📱 Responsive mobile-friendly UI  
- 📈 Monthly/Yearly statistics dashboard  
- 💾 Export expenses as CSV/Excel  
- ☁️ Deploy on **Heroku / AWS / Vercel**  


## 🤝 Contributing

Contributions are welcome! 🎉  
1. Fork the repo  
2. Create a new branch (`feature/new-feature`)  
3. Commit your changes  
4. Push to the branch and open a Pull Request  



## 📄 Author

**Shanmukha Poorna Chand**  
Java Full-Stack Developer | Passionate about Web Development and Clean UI Design  
📧 shanmukhapoornachand14316@gmail.com  
🔗 [LinkedIn Profile](www.linkedin.com/in/shanmukha-poorna-chand-adapaka)


> *Built with ❤️*