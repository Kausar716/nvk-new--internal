import Loader from "react-loader-spinner";
const LoaderComp = ()=>{
      
    return(
        <Loader
        type="TailSpin"
        color="rgb(155, 236, 34)"
        height={50}
        width={50}
        timeout={300} 
        />
          
    );
}
export default LoaderComp;