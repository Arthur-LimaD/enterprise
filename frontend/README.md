## Rules

- Made using React and NodeJS
- Consume a external API
- Use Sessions and Cookies authentication
- Responsivity and pleasable Design
- Information Secured on Back and Front End
- Visual identity
- Use good design pattern and performative data structure

## Introduction

### Abstract

gerenciamento de empresas 

Registro de receitas, depesas, calculo de lucros e gráficos com GraphJS

Cálculo da DRE, comparação com empresas do segmento através de API 

### Structure

- Routing with React Routes
- Login and Authentication with Passport
- Storing users on MySQL database secure way with bcrypt
- Dashboard showing:
    - User Logged Info
    - User’s enterprise info (Graphic with last results)
    - Market info (Using external API, searching like Selic, PIB, last market News ([https://finnhub.io/docs/api/](https://finnhub.io/docs/api/))
- Entrerprises info stored on array JSON on BackEnd (stored on Database if necessary)
- Screen to create and edit enterprise info

### Data Structure

The user's info is stored on a MySql database, the password is hashed.
The Companies info is stored on a JSON array in the row "Company" of the database, the structure seems like this:

 {
  "name": "STRING",
  "email": "STRING",
  "company": [
    {
      "id": NUMBER,
      "name": "STRING",
      "value": NUMBER,
      "segment": "STRING",
      "description": "STRING",
      "data": [
        {DATA-TIME : {
          "income" : NUMBER,
          "expense" : NUMBER,
          "notes" : "STRING",
          "profit" : NUMBER
          
        }},
        {DATA-TIME : {
            "income" : NUMBER,
            "expense" : NUMBER,
            "notes" : "STRING",
            "profit" : NUMBER
              
        }}
      ]
    }
  ]
}

Used Tools:

| Back-End | Front-End |
| --- | --- |
| Node JS | ReactJs |
| MySQL | GraphJs |
| Express |  |
|  |  |
