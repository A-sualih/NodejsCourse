const allUsers=[]
const postUsers=(req, res) => {
  const { users } = req.body;

  const createdPlace = users.map(user => ({
    id: user.id,
    name: user.name,
    livenow: user.livenow
  }));

  // ✅ Add to global array
  allUsers.push(...createdPlace);
  
  res.status(201).json({ 
    message: "Users Created Successfully", 
    place: allUsers 
  });
}
 function getUsers(req, res)  {
  res.status(200).json({ 
    message: "Users retrieved successfully",
    users: allUsers,
  });
}

 function getuser(req, res, next)  {
  const userId = Number(req.params.pid);
  const user = allUsers[userId];
  if (user) {
    res.status(200).json(user);
  } else {
 
 return   res.status(404).json({message:" The route is not find"});
  }
  next();
}
module.exports={
    postUsers,
    getUsers,
    getuser
}