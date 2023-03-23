source './.env_deploy'
npm run build
rsync -r dist/* $server:$deploy_dir
ssh $server "chmod -R 775 $deploy_dir/*"
