const newFormHandler = async (event) => {
    event.preventDefault();
  
    const postTitle = document.querySelector('#post-title').value.trim();
    const postContent = document.querySelector('#post-content').value.trim();
    const dateCreated = document.querySelector('#date-created').value.trim();
  
    if (postTitle && postContent && dateCreated) {
      const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({ postTitle, postContent, dateCreated }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed!');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed!');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);