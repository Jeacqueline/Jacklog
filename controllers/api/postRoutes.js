const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: [user_id]
        },
      ],
    });

    const posts = dbPostData.map((posts) =>
      Post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {

    const dbPostData = await Post.create({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      date_created: req.body.date_created,
      user_id: req.body.user_id
    });
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbPostData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async(req,res)=>{
    try{
      const dbPostData = await Post.update({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      },
      {
      where: { 
      id: req.params.id
    }
});
  if (!dbPostData) {
    res.status(404).json({ message: 'No post found with this id' });
    return;
  }
    res.json(dbPostData);
    }
    catch(err) {
      res.status(500).json(err);
    }
  });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbpostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!dbpostData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;