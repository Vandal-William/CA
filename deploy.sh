#!/bin/bash

# Variables
SOURCE_DIR="/home/ubuntu/management"
DEST_API_BUSINESS="/var/www/api-business"
DEST_API_PUBLICATION="/var/www/api-publication"
DEST_FRONT_MANAGEMENT="/var/www/front-management"

# Fonction pour installer les dépendances et construire un projet
build_project() {
  local project_dir=$1
  cd $project_dir
  npm install
  npm run build
}

# Construire et copier les fichiers de l'API Business
build_project "$SOURCE_DIR/api-business"
rm -rf $DEST_API_BUSINESS
mkdir -p $DEST_API_BUSINESS
cp -r $SOURCE_DIR/api-business/dist/* $DEST_API_BUSINESS/

# Construire et copier les fichiers de l'API Publication
build_project "$SOURCE_DIR/api-publication"
rm -rf $DEST_API_PUBLICATION
mkdir -p $DEST_API_PUBLICATION
cp -r $SOURCE_DIR/api-publication/dist/* $DEST_API_PUBLICATION/

# Construire et copier les fichiers du Frontend Management
build_project "$SOURCE_DIR/front-management"
rm -rf $DEST_FRONT_MANAGEMENT
mkdir -p $DEST_FRONT_MANAGEMENT
cp -r $SOURCE_DIR/front-management/dist/* $DEST_FRONT_MANAGEMENT/

# Redémarrer les applications avec PM2
cd $DEST_API_BUSINESS/src
pm2 restart main.js --name api-business || pm2 start main.js --name api-business

cd $DEST_API_PUBLICATION/src
pm2 restart main.js --name api-publication || pm2 start main.js --name api-publication