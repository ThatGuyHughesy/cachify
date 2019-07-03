pushd ../server/client
npm run build
popd
rsync -ahvz --progress --include-from=rsync/include --exclude-from=rsync/exclude ../server/ cachify.io:/var/www/cachify/
rsync -ahvz --progress pm2/cachify.config.js cachify.io:/var/www/cachify/
rsync -ahvz --progress apache/*.conf cachify.io:/etc/apache2/sites-available/
rsync -ahvz --progress apache/.htaccess cachify.io:/var/www/cachify/client/build/