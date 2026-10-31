# Deployment

- Create AWS account
- Create the instance and give name and get key value pair file in downloads
- Launch Instance
- chmod 400 <secret>.pam
- ssh -i "devTinder-secret.pem" ubuntu@ec2-3-26-36-83.ap-southeast-2.compute.amazonaws.com
- nvm install <node_version>
- Git clone frontend and backend repo 
- Now Deployment of frontend code on server

# Frontend 

- npm install
- npm run build -> It will give dist file
- sudo apt update -> To update dependencies
- sudo apt install nginx
- sudo systemctl start nginx
- sudo ssytemctl enable nginx
- Copy code from dist (build file) to /var/www/html/
- sudo scp -r dist/* /var/www/html/
- enable port :80 of your instance under security settings
- Now run the server using publc ip of instance 

# Backend

- Allow ec2 instance pulic ip on mongo server
- npm install pm2 -g
- pm2 start npm --name "DevTinder_Backend" -- start
- pm2 logs
- pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>


# Frontend: http://3.26.36.83/
# Backend:  http://3.26.36.83:3000/

# nginx config :  sudo nano /etc/nginx/sites-available/default

server_name 3.26.36.83

location /api/ {
    proxy_pass http://3.26.36.83:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

- sudo systemctl restart nginx

