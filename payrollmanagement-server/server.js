const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const session = require('express-session')
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        database: "Payroll",
        password: "5432160"
    }
})
const app = express()

app.use(bodyParser.json())
app.use(session({
    key: '@p@(He',
    secret: 'm5f4s3@2$',
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    }
}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => { res.send("it is working") })
/**=============================================Login================================*/
app.post('/signin', (req, res) => {

    const { Id, password } = req.body
    knex.select("*").from('login').where("Id", '=', Id)
        .then(user => {
            const validUser = bcrypt.compareSync(password, user[0].Hash)
            if (validUser) {
                return knex.select('*').from('employee')
                    .where('Id', '=', Id)
                    .then(employee => {
                        req.session.user = employee[0]
                        console.log(req.session)
                        res.setHeader('Access-Control-Allow-Credentials', 'true')
                        res.json(employee[0])
                    })
                    .catch(err => res.status(400).json('entered wrong password!'))
            }
            else {
                res.status(400).json('entered wrong password!')
            }
        })
        .catch(err => res.status(400).json('wrong credentials!'))
})
/**==================================================================================================*/
/**=========================================Add employee ============================================*/
app.post('/register', (req, res) => {
    const { Id, Name, DOB, password, Type } = req.body;
    console.log(Id + " " + Name + " " + password + " " + Type + " " + DOB)
    const Hash = bcrypt.hashSync(password);
    knex.transaction(trx => {
        trx.insert({
            Id: Id,
            Hash: Hash
        })
            .into('login')
            .returning('Id')
            .then(loginId => {
                return trx('employee')
                    .returning("*")
                    .insert({
                        Id: loginId[0],
                        Name: Name,
                        DOB: DOB,
                        Type: Type
                    })
                    .then(employee => {
                        req.session.user = employee[0]
                        res.json(employee[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json("unable to register"))
})
/**========================================================================================*/
/**====================================Update Profile======================================*/
app.post('/update', (req, res) => {
    const { Id, Name, DOB, password } = req.body
    console.log(Id + ' ' + Name + " " + DOB + ' ')
    if (password !== '') {
        const Hash = bcrypt.hashSync(password)
        knex.transaction(trx => {
            trx('login').where('Id', "=", Id)
                .update({
                    Hash: Hash
                })
                .returning('Id')
                .then(empId => {
                    return trx('employee').where("Id", "=", empId[0])
                        .update({
                            Name: Name,
                            DOB: DOB
                        })
                        .returning("*")
                        .then(updatedDetails => {
                            res.json(updatedDetails[0])
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
    }
    else {
        return knex('employee').where('Id', '=', Id)
            .update({
                Name: Name,
                DOB: DOB
            })
            .returning("Id")
            .then(() => {
                return knex.select("*").from("employee")
                    .where("Id", "=", Id)
                    .then(updatedEmp => res.json(updatedEmp[0]))
                    .catch(err => res.status(400).json("Unable"))
            })
    }

})
/**=================================================================================================*/
/**=======================================Update employee ==========================================*/
app.post('/updateEmployee', (req, res) => {
    const { Id, Name, DOB, password } = req.body
    const Hash = bcrypt.hashSync(password)
    knex.select('*').from('employee').where("Id", "=", Id)
        .returning("Id")
        .then(empId => {
            if (Hash !== '' && (Name === '' && DOB === '')) {
                return knex('login').where("Id", "=", empId)
                    .update({
                        Hash: Hash
                    })
                    .then(
                        res.json("Updated employee's password successfully!")
                    )
            }
            else {
                if (Hash !== '' && Name !== '') {
                    return knex.transaction(trx => {
                        trx('login').where("Id", "=", empId).
                            update({
                                Hash: Hash
                            })
                            .returning("Id")
                            .then(userId => {
                                trx('employee').where('Id', '=', userId)
                                    .update({
                                        Name: Name
                                    })
                                    .then(res.json("employee updated successfully"))
                            })
                            .then(trx.commit)
                            .catch(trx.rollback)
                    })
                        .catch(err => res.status(400).json("employee not updated!"))
                }
                else {
                    if (Hash !== '' && (Name !== '' && DOB !== '')) {
                        return knex.transaction(trx => {
                            trx('login').where("Id", "=", empId).
                                update({
                                    Hash: Hash
                                })
                                .returning("Id")
                                .then(userId => {
                                    trx('employee').where('Id', '=', userId)
                                        .update({
                                            Name: Name,
                                            DOB: DOB
                                        })
                                        .then(res.json("employee updated successfully"))
                                })
                                .then(trx.commit)
                                .catch(trx.rollback)
                        })
                            .catch(err => res.status(400).json("employee not updated!"))
                    }
                }
            }
        })
})
/**===========================================================================================================================*/
/*============================================================================================================================*/
app.post('/delete', (req, res) => {
    const id = req.body
    console.log(id.Id)
    if (id.Id !== '') {
        knex.transaction(trx => {
            trx("login").where('Id', '=', id.Id)
                .del()
                .then(() => {
                    return trx("employee").where("Id", "=", id.Id)
                        .del()
                        .then(() => {
                            res.json("employee deleted successfully")
                        })
                })
                .then(trx.commit)
                .then(trx.rollback)
        })
            .catch(err => res.status(400).json("employee deletion unsuccessful!"))
    }
    else {
        res.status(400).json("Invalid employee id")
    }
})
/***========================================================================================*/
/**=================================Edit Salary=============================================*/
app.post('/salary', (req, res) => {
    console.log(req.body)
    const { Id, gpay, hra, esi } = req.body
    console.log(Id + " " + gpay + " " + hra + " " + esi)
    knex('employee').select('Id').where("Id", "=", Id)
        .then(() => {
            knex.raw('INSERT INTO salary (gpay,hra,esi,Id) values (?,?,?,?) ON CONFLICT (Id) DO UPDATE SET Id=?,gpay=?,hra=?,esi=?', [gpay, hra, esi, Id, Id, gpay, hra, esi])
                .then(res.json("successfully updated"))
        })
        .catch(err => res.status(400).json("salary update unsuccessful!"))
})
/**===========================================================================*/
/**=====================================Attendance============================*/
app.post('/attendance', (req, res) => {
    const { id, date } = req.body
    console.log(id + " " + date)

    /*****knex.insert({id:id,
             date:date,
              present:'YES'})
    .into('attendance')
    knex.raw("INSERT INTO attendance (id,date,present) VALUES(?,?,?)  ", [id, date, 'YES'])
        .then(user => {
            console.log(user[0])
            res.json("attendance updated!")
        })
        .catch(err => console.log(err))**/
    knex('attendance').select("*")
        .where({
            id: id,
            date:date
        }).
        then(userAtt => {
            console.log(Object.keys(userAtt).length)
            if (Object.keys(userAtt).length>=1) {
                res.json("Attendance already updated!")
            }
            else {
                knex.raw("INSERT INTO attendance (id,date,present) VALUES(?,?,?)  ", [id, date, 'YES'])
                    .then(user => {                        
                        res.json("attendance updated!")
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err=>{            
            res.status(400).json("Error updating attendance!")
        })
})

app.post("/attendanceReport", (req, res) => {
    const { id, fromDate, toDate } = req.body
    const fromDatec = new Date(fromDate).toISOString().substring(0, 10)
    const toDatec = new Date(toDate).toISOString().substring(0, 10)
    console.log(fromDatec + " " + toDatec)
    knex("attendance").select('*')
        .whereBetween('date', [fromDatec, toDatec])
        .andWhere("id", '=', id)
        .then(attrepo => {
            if(Object.keys(attrepo[0]).length>0){
                console.log(attrepo)
                res.json(attrepo)
            }                
            else{
                res.json("No report found")
            }
        })
        .catch(err => res.status(400).json("Unable to get the report"))
})
/**=================================================================================*/
/**============================payroll=============================================*/
app.post('/payroll', (req, res) => {
    const { id, c_date } = req.body.id
    knex('salary').select("*")
        .where("id", "=", id)
        .then(emp => {
            knex('attendance').count('present').where('date', '<=', '2020-05-04').andWhere('date', '>=', '2020-03-02').andWhere("id", '=', id)
                .then(dayspresent => {
                    const rate = (emp[0].gpay / 26)
                    const credited = Math.round((rate * dayspresent[0].count + emp[0].hra) - emp[0].esi)
                    knex('payroll').insert({
                        id: id,
                        daysworked: dayspresent[0].count,
                        c_salary: credited,
                        c_date: c_date
                    })
                        .then(sal => {
                            knex('payroll').select('*').where('Id', "=", id).andWhere('c_date', "=", c_date)
                        })
                })
        })
})
app.get("/payrollReport", (req, res) => {
    knex('payroll').select("*")
        .then(payroll => res.json(payroll))
})
app.get("/salaryReport", (req, res) => {
    knex('salary').select("*")
        .then(salary => res.json(salary))
})
/**========================================check Sign in \Sign out=================================================*/
app.get("/signout", (req, res) => {
    console.log("signout route")
    console.log(req.session)
    req.session.destroy(err => {
        res.json("signedOut")
    })
})
app.get("/checkSignedIn", (req, res) => {
    if (req.session.user) {
        console.log(req.session.user)
        res.json(req.session.user)
    }
    else {
        res.json("signedOut")
    }
})
/**=================================================================================================================*/
/**=================================================Employee Details================================================*/
app.get("/employeeDetail",(req,res)=>{
    knex("employee")
    .select("*")
    .then(details=>{
        if(Object.keys(details).length>0){
            console.log(details)
            res.json(details)
        }
        else{
            res.json("No employee records found")
        }
    })
    .catch(err => res.status(400).json("Error getting details"))
})
/**=================================================================================================================*/

app.listen(8080, () => {
    console.log('working!')
})