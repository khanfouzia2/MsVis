In order to run MsVis tool, please run the following instructions after cloning the repo to your server.

Install Grafana.

Update url to the plugins folder in grafana.ini file.

Run 'yarn watch' to compile front end plugin.

To compile backend plugin use the guide at:
https://github.com/HadesArchitect/simple-json-backend-datasource/tree/build-docs


To run Prometheus from within Jaeger App:
Move to: E:\MS SD 2018-2019\Thesis\Tool\Project Repo\hotrod\Prometheus\jaeger-master\jaeger-master\examples\hotrod\prometheus-2.17.1.windows-amd64
Then run:
prometheus --config.file=prometheus.yml

Run the hotrod app (available in HotRod folder).

Login to Grafana.
Add Jaeger-backend-datasource Plugin by providing the requested configuration.
Add Prometheus plugin by providing the requested configuration.
Add MySql plugin by providing the requested cofiguration.

Add MsViz panel and start visualizing the microservices call dependency graph alongside call count, performance, load and business metrics for each microservice.
