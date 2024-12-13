
const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.listen(3000, () => {
      console.log("Сервер ожидает подключения на http://localhost:3000");
    });
    
app.get("/api/users/:id", (req, res) => {
      const id = req.params.id;
      const content = fs.readFileSync("users.json", "utf8");
      const users = JSON.parse(content);
    });
    
let user = null;

for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
          user = users[i];
          console.log("🚀 ~ app.get ~ user:", user);
          break;
        }
      }
        
if (user) {
    res.json({ success: true, message: user });
  } else {
    res.status(404).json({ success: false, message: "" });
  }

app.post("/api/users", (req, res) => {
      const { name, age } = req.body;
    
      if (name == null || age == null) {
        res.status(404).json({ success: false, message: "Данные не заполнены" });
      }
    
      const data = fs.readFileSync("users.json", "utf8");
      const users = JSON.parse(data);
    const validateUserData = (user) => {
        const nameRegex = /^[A-Za-z\s]+$/; // Имя пользователя: только буквы и пробелы
        const ageRegex = /^[1-9]\d*$/; // Возраст: положительное число
        const idRegex = /^\d+$/; // ID пользователя: только цифры
    
        if (!nameRegex.test(user.name)) {
            throw new Error('Имя пользователя должно содержать только буквы и пробелы.');
        }
        if (!ageRegex.test(user.age)) {
            throw new Error('Возраст должен быть положительным числом.');
        }
        if (!idRegex.test(user.id)) {
            throw new Error('ID пользователя должен быть числом.');
        }
    };
    
      let user = { name, age };
    
      const id = Math.max.apply(
        Math,
        users.map((o) => {
          return o.id;
        }),
      );

      user.id = id + 1;
      users.push(user);
    
      const newData = JSON.stringify(users);
    
      fs.writeFileSync("users.json", newData);
    
      res.json({ success: true, message: user });
    });
    
app.delete("/api/users/:id", (req, res) => {
      const id = req.params.id;
    
      if (id == null || id == "") {
        res.status(404).json({ success: false, message: "Данные не заполнены" });
      }
    
      const data = fs.readFileSync("users.json", "utf8");
      const users = JSON.parse(data);
    
      let index = -1;
    
      for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
          index = i;
          break;
        }
      }
    
      if (index > -1) {
        const user = users.splice(index, 1)[0];
    
        const data = JSON.stringify(users);
    
        fs.writeFileSync("users.json", data);
    
        res.json({ success: true, message: user });
      } else {
        res.status(404).json({ success: false, message: "Ошибка записи" });
      }
    });

    const fs = require('fs').promises;

    // Чтение файла
    const readFileAsync = async (file) => {
        try {
            const data = await fs.readFile(file, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Ошибка чтения файла:', error);
        }
    };
    
    // Запись в файл
    const writeFileAsync = async (file, data) => {
        try {
            await fs.writeFile(file, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Ошибка записи в файл:', error);
        }
    };

    const isUserNameUnique = (users, newUser) => {
        return !users.some(user => user.name === newUser.name);
    };
    
    // Пример использования
    if (!isUserNameUnique(users, newUser)) {
        throw new Error('Имя пользователя уже существует.');
    }

    const logOperation = async (message) => {
        const logMessage = `${new Date().toISOString()} - ${message}\n`;
        await fs.appendFile('logs.txt', logMessage);
    };
    
    // Пример логирования
    await logOperation('Добавлен новый пользователь: ' + JSON.stringify(newUser));

    const createBackup = async () => {
        try {
            await fs.copyFile('users.json', 'users_backup.json');
        } catch (error) {
            console.error('Ошибка при создании резервной копии:', error);
        }
    };

    const filterUsers = (users, name, age) => {
        return users.filter(user => {
            const nameMatches = name ? user.name.includes(name) : true;
            const ageMatches = age ? user.age === age : true;
            return nameMatches && ageMatches;
        });
    };
