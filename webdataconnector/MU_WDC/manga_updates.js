(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Genre",
            alias: "manga type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Description",
            alias: "genre description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Series",
            alias: "number of manga of this type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Authors",
            alias: "number of authors of manga of this type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Filters",
            alias: "number filters of manga of this type???",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Highlights",
            alias: "number of highlight manga of this type???",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Demographic",
            alias: "are there readers of this type of manga",
            dataType: tableau.dataTypeEnum.bool
        }];

        var tableSchema = {
            id: "MangaGenre",
            alias: "Manga genres available in manga updates",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://api.mangaupdates.com/v1/genres", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "Genre": feat[i].properties.Genre,
                    "Description": feat[i].properties.Description,
                    "Series": feat[i].properties.Stats.Series,
                    "Authors": feat[i].properties.Stats.Authors,
                    "Filters": feat[i].properties.Stats.Filters,
                    "Highlights": feat[i].properties.Stats.Highlights,
                    "Demographic": feat[i].properties.Demographic
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Manga Updates API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
