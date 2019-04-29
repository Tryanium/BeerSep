# Document de l'api BeerSep

## Introduction

Il s'agit avant tout d'un projet scolaire utilisant Node JS / Travis CLI / Heroku pour le back-end

## Endpoints

1. Pour la connexion à Twitter

  endpoint : `https://beersep.herokuapp.com/twitter/oauth/callback`

  Expected output :
  `data = {
    userName: "username de Twitter",
    userImg: "L'image de profil de twitter"
    }e
