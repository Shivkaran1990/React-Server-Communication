import React, { Component } from 'react';
//import axios from 'axios';

import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state={
        posts:[],
        selectedPostId:null,
        error:false
    }
    componentDidMount(){
      axios.get('/posts')
      .then(respone=>{
          const posts=respone.data.slice(0,4);
          const updatedPost=posts.map(post=>{
            return{
                ...post,
                author :'Karan'
            }
          });
          this.setState({posts:updatedPost});
          console.log(updatedPost);
      }).catch(error=>{
          console.log(error);
          this.setState({error:true});
      })
    }
    selectedPostHandler=(id)=>{
        this.setState({selectedPostId:id});
    }
    render () {

        let posts=<p style={{textAlign:'center'}}>someting went wrong cant load the data !</p>
        if(!this.state.error)
        {
            posts=this.state.posts.map(post=>{
                return <Post author={post.author} 
                key={post.id} 
                title={post.title}
                 clicked={()=>this.selectedPostHandler(post.id)}></Post>
            });
        }
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;