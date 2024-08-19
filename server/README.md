# Express Server setup

### Install dependencies
cd into your /server folder and make sure you have all dependences installed with:

```sh
npm install
```
------------------------------------
### Setup .env file
Create a duplicate of the the `.env.example` file found in the /server directory and rename it to `.env`

In your new `.env` file, come up with a new string for your JSON web token key (JWT_KEY)

------------------------------------
### Setup MongoDB Atlas Cloud server

Create a MongoDB Atlas Cloud account here: https://account.mongodb.com/account/login

- Create a new project and name it to `LocalGems_DB`, and a within it a cluster named `Cluster0`.

- Create a new database named `LocalGems`. Within the database create 3 collections named `cities`, `users`, and `gems`.

- In the server/db/schema folder you will find some database seed files. Use the database schema files to seed your respective collections.

------------------------------------
### Generate an Atlas URI connection string for your .env 

1 - Open the Connection Method dialog.

- Click Database in the sidebar in MongoDB Atlas.

- Click Connect for the database deployment to which you want to connect.

- Click Choose a Connection Method. MongoDB Atlas selects Standard Connection by default. To connect using a private endpoint, select Private Endpoint.

2 - Choose a connection method.
- To connect to your application, click Drivers. To connect using tools, click the tool you want to use to access your data.

3 - Follow instructions for the connection method you selected.
- If you selected Drivers, select your driver and version. If you selected a tool, download the tool.

- If your database deployment is a cluster, select Connect To Cluster.

- Copy the connection string. Replace <password> and <username> in the connection string with the database user's credentials.


Your URI key should look something along the lines this:
`mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]`

Once you have it ready, paste it into your `.env` file into the ATLAS_URI value

<b>Complete Guide here</b>: https://www.mongodb.com/docs/manual/reference/connection-string/


------------------------------------
### Add your IP to access list

Under the Organization Access Manager, You must add your IP address to the IP access list before you can connect to your cluster. 

To add your IP address to the IP access list: 

1 - Click Connect.

- In the Clusters view, click Connect for the cluster to which you want to connect. Atlas highlights the Setup connection security step.

2 - Click Add Your Current IP Address.

- To secure your AtlasGov cluster, limit access to specified IP addresses. 
  The menu expands to show the Add a connection IP address modal.

3 - Click Add IP Address and fill out field.

<b>Complete Guide here</b>: https://www.mongodb.com/docs/atlas/government/tutorial/allow-ip/
