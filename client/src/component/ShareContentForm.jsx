import React, { useState } from 'react';
import axios from 'axios';

const ShareContentForm = () => {
  const [content, setContent] = useState('');

  const handleShare = async () => {
    // // Assuming your Express server is running on port 5000
    // axios.post('/share', { content })
    //   .then((response) => {
    //     // Handle success response
    //     console.log(response.data.message);
    //     // Reset the content field
    //     setContent('');
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error('Error sharing post:', error.response.data.error);
    //   });
    try {
        const res = await axios.post('https://api.linkedin.com/v2/ugcPosts', content );
        console.log(res)
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your content here..."
      />
      <button onClick={handleShare}>Share on LinkedIn</button>
    </div>
  );
};

export default ShareContentForm;
