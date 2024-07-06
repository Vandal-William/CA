#!/bin/bash

# Variables
SOURCE_DIR="/home/ubuntu/management/source"
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
sudo rm -rf $DEST_API_BUSINESS
sudo mkdir -p $DEST_API_BUSINESS
sudo cp -r $SOURCE_DIR/api-business/dist/* $DEST_API_BUSINESS/

# Construire et copier les fichiers de l'API Publication
build_project "$SOURCE_DIR/api-publication"
sudo rm -rf $DEST_API_PUBLICATION
sudo mkdir -p $DEST_API_PUBLICATION
sudo cp -r $SOURCE_DIR/api-publication/dist/* $DEST_API_PUBLICATION/

# Construire et copier les fichiers du Frontend Management
build_project "$SOURCE_DIR/front-management"
sudo rm -rf $DEST_FRONT_MANAGEMENT
sudo mkdir -p $DEST_FRONT_MANAGEMENT
sudo cp -r $SOURCE_DIR/front-management/dist/* $DEST_FRONT_MANAGEMENT/

# Fonction pour copier le package.json
copy_package_json() {
  local source_dir=$1
  local dest_dir=$2
  sudo cp $source_dir/package.json $dest_dir/package.json
}

# Copier le package.json de l'API Business
copy_package_json "$SOURCE_DIR/api-business" "$DEST_API_BUSINESS"

# Copier le package.json de l'API Publication
copy_package_json "$SOURCE_DIR/api-publication" "$DEST_API_PUBLICATION"

# Redémarrer les applications avec PM2
cd $DEST_API_BUSINESS/src
npm install
pm2 restart main.js --name api-business || pm2 start main.js --name api-business

cd $DEST_API_PUBLICATION/src
npm install
pm2 restart main.js --name api-publication || pm2 start main.js --name api-publication
