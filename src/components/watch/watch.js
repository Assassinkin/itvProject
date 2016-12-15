import _ from 'lodash' ;
import React, {Component} from 'react';
import { connect} from 'react-redux';
import * as actions from '../../actions';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';



const API_KEY = 'AIzaSyD5EqFMNQ2q32EHyW72D77QayVQ_FPLMIc';




// Create a new component. This component should produce some html
class Watch extends Component{
  componentWillMount() {
    this.props.fetchMessage();

  }
  pub() {
    const age=localStorage.getItem('age')
    const gender=localStorage.getItem('gender');
    const interest=localStorage.getItem('interest');
    if (gender==='M'&&age<18&&age>12){
      return (
        <div>
        <iframe className="adds" src="civ6.mp4"></iframe></div>
      )}
      if (gender==='M'&&age<30&&age>18){
        return (
          <div><iframe className="adds" src="alien.mp4"></iframe></div>
        );
    }

    if (gender==='F'&&age<30&&age>12){
      return (
        <div><iframe className="adds" src="shoes.mp4"></iframe></div>
      );
    } else {
      return(
    <div><img className="adds" src="https://media1.giphy.com/media/G3gpeaQANTSuc/200.gif#40"></img></div>
    );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    const searchTerm = localStorage.getItem('term');
    this.videoSearch(searchTerm);
  }
  videoSearch(term) {
    YTSearch({key: API_KEY,term: term}, (videos) => {
      //this.setState({videos});
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }


  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)},800);
    return (
      // <!--<div>{this.props.message}</div>--> fi <div> en principe
      <div>

        <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList onVideoSelect={selectedVideo =>this.setState({selectedVideo})} videos={this.state.videos}/>
        {this.pub()}

      </div>)
  }
}
 function mapStateToProps(state) {
   return { message: state.auth.message};
 }
export default connect(mapStateToProps, actions)(Watch);
