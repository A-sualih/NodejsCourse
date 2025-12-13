const API_URL='http://localhost:5000/v1';
async function httpGetPlanets() {
const response= await fetch(`${API_URL}/planets`)
return await response.json()
}
async function httpGetLaunches() {
const response=await fetch(`${API_URL}/lauches`)
const fetchedLaucnhes= await response.json()
return fetchedLaucnhes.sort((a,b)=>{
  return a.flightNumber-b.flightNumber;
})
}
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/lauches`,{
  method:"post",
  headers:{
    "Content-Type":"application/json",
  },
  body:JSON.stringify(launch),

});
} catch (err) {
  console.log(err)
    return {
      ok:false,
      
    };
   
  }
 
}
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/lauches/${id}`,{
method:"delete",
})
  } catch (error) {
          console.log(error);
    return{
      ok:false
    }
  }

}
export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};