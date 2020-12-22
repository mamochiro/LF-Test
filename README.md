# Read Me Lf - test

Date Created: Dec 22, 2020 11:31 AM
Status: Doing

# Design System Diagram

---

[https://bit.ly/3aEvms9](https://bit.ly/3aEvms9)

# Design Database Diagram

---

[https://dbdiagram.io/d/5fe176529a6c525a03bbed53](https://dbdiagram.io/d/5fe176529a6c525a03bbed53)

# Project Requirement

---

- yarn
- docker
- sequelize

# Installation

---

yarn # install **dependenciesse**

docker-compose up  # start project

## End Point Url

---

[http://localhost:3000/graphql](http://localhost:3000/graphql)

# Overview API

---

### seed for test data

### how to login

### assignment

- สร้าง account เจ้าของฟาร์มได้
    - mutation registerUserWithEmail
- เจ้าของฟาร์มต้อง login ก่อนใช้งาน
    - mutation loginWithEmail
- เพิ่ม/ลบ/แก้ไขคนงานในฟาร์มได้
    - mutation registerWorker
    - mutation updateWorker
    - mutation destroyWorker
- สร้างฟาร์มได้
    - mutation registerFarm
    - mutation updateFarm
- เพิ่ม/ลบ/แก้ไขรถไถในฟาร์มได้
    - mutation registerTractor
    - mutation registerTractor
    - mutation registerTractor
- เพิ่ม/ลบ/แก้ไขแปลงในฟาร์มได้
    - mutation registerGarden
    - mutation registerGarden
    - mutation registerGarden
- เพิ่มกิจกรรมในแปลงได้
    - mutation registerEvent
    - mutation registerEvent
    - mutation registerEvent
- สรุปรายรับ รายจ่ายในแต่ละช่วงเวลาได้