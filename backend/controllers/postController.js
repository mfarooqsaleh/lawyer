import Posts from '../models/postModel.js';

// Create and Save a new post
const create = (req, res) => {
    // Validate request
    if(!req.body.content){
        res.status(400).send({
            message:"Please Add Content"
        })
    }

    // Create a post
    const posts = new Posts({
        
        title: req.body.title, 
        content: req.body.content
     
    });

    // Save post in the database
    posts.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the post."
        });
    });
};
const findAll = (req, res) => {
    Posts.find().sort({"postId":1})
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });
};


const findOne = (req, res) => {
    Posts.findById(req.params.postId)
    .then(posts => {
        if(!posts) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(posts);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving post with id " + req.params.postId
        });
    });
};



// Update a post identified by the postId in the request
const update = (req, res) => {
  

    // Find post and update it with the request body
    Posts.findByIdAndUpdate(req.params.postId, {
        title: req.body.title, 
        content: req.body.content,
      

    }, {new: true})
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error updating post with id " + req.params.postId
        });
    });
};



const del = (req, res) => {
    Posts.findByIdAndRemove(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        res.send({message: "post deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Could not delete post with id " + req.params.postId
        });
    });
};


export{create,findAll,findOne,update,del};