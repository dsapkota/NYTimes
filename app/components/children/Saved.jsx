
var React = require("react");

var helpers = require("../utils/helpers.js");

var Saved = React.createClass({

  getInitialState: function() {
    return {
      doIneedThis: false
    };
  },

  _handleDelete: function(event) {

    var articleMongoId = event.target.value;

    var that = this;

    helpers.apiDelete(articleMongoId).then(function(){

      helpers.apiGet().then(function(query){
        that.props._resetMongoResults(query.data);
      });

    });


  },

  render: function() {

    var that = this;

    return (

      <div className="panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><i><b>Saved Articles</b></i></h3>
        </div>

        <div className="panel-body">
          <ul className="list-group col-md-8 col-md-offset-2">

            {/* ++++++++++++++++++++++++++++++++ ITERATE HERE ++++++++++++++++++++++++++++++++ */}
            {/* Here we use a map function to loop through an array in JSX */}
            {this.props.mongoResults.map(function(search, i) {

              return (
                <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                  <div className="input-group">
                    <div type="text" className="form-control">
                      <b><a href={search.url} target="_new" style={ {color: "black"} }>{search.title}</a></b>
                      <i> {search.date.substring(0, 10)}</i>
                    </div>
                    <span className="input-group-btn">
                      <button className="btn btn-danger" type="button" onClick={that._handleDelete} value={search._id}>Remove</button>
                    </span>
                  </div>
                </li>
              );
            })}

          </ul>
        </div>

      </div>

    );
  }
});

module.exports = Saved;
