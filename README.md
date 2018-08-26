# G-Stack-StoryMap
User Story Mapping

## Dev Environment Prerequisitions
- Java 10+
- Neo4j
- Node.js
- Gulp
- Rollup
- Maven

## Run Environment Prerequisitions
- Java 10+
- Neo4j
- Chrome

## Features
- Multiple StoryMappings
- Flexible & Smart Card Drag&Drop
- Release Planning
- Card Description in Markdown
- Card nessesity & Colored flags
- Card Comments
- Card Acceptance Criteria

## Configuration Guide
### Default Server Configurations
- Front End: http://localhost:8086
- Back End: http://localhost:8085
- Neo4j: bolt://localhost:17687 username: neo4j password: root

### Configuring Neo4j Port
- Goto the directory where your neo4j installed/stored
- Open `./conf/neo4j.conf`
- Find this option `dbms.connector.bolt.listen_address` and change the port to `:17687`

### Configuring Github Securing
- Visit https://github.com/settings/developers and create new OAuth App
- Create `application.yml` under the directory where your BackEnd jar saved in
- Replace `clientId` and `clientSecret` with the values of your new created oauth app's

### Run application
- Start neo4j instance
- Start FrontEnd: `java -jar gstack-storymap-1.0.0.jar`
- Start BackEnd: `java -jar gstack-storymap-api-1.0.0.jar`
