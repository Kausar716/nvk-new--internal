import React from 'react'


 export class StaffDirectory extends React.Component {  
     render(){
//logo_noimage
        // let TempUrl = "./images/noPerson.png";
        let TempUrl = "./images/logo_noimage.png";

    return (
        <div>
            <div class="contentHeader bg-white d-flex align-items-center">
                <h1 class="page-header mb-0 d-flex align-items-center">
                    <img src="assets/img/staff-directory-green.svg" class="mr-2"/>Staff Directory
                </h1>
			</div>
			<div class="contentWrapper">
				<div class="row">
					<div class="col-xl-12 col-md-12">
						<div class="bg-white p-15">
                            <div class="form-group row">
                                <div class="col-md-4 col-lg-4">
                                    <label for="plantSearch">Search Staff</label>
                                    <div class="searchInput">
                                        <button type="submit" class="btn btn-search">
                                            <img src="assets/img/search.svg" alt=""/>
                                        </button>
                                        <input type="text" class="form-control" placeholder="Search"/>
                                    </div>
                                </div>
                                <div class="col-md-4 col-lg-4 mt-2 mt-md-0">
                                    <label for="Category">Position</label>
                                    <select class="form-control">
                                        <option>Sales</option>
                                    </select>
                                </div>
                                <div class="col-md-4 col-lg-4 pt-0 pt-lg-4 mt-3 mt-lg-3">
                                    <div class=" d-lg-flex align-items-center">Show Favourites Only
                                        <div class="switcher ml-lg-2 d-block d-lg-inlline-block mt-2 mt-md-0">
                                            <input type="checkbox" name="switcher_checkbox_2" id="switcher_checkbox_2" value="2"/>
                                            <label for="switcher_checkbox_2"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row mt-4">
                                <div class="col-md-12 col-lg-12">
                                    <ul class="list-unstyled searchAlpha d-flex flex-wrap">
                                        <li><a href="#" class="active">All</a></li>
                                        <li><a href="#">A</a></li>
                                        <li><a href="#">B</a></li>
                                        <li><a href="#">C</a></li>
                                        <li><a href="#">D</a></li>
                                        <li><a href="#">E</a></li>
                                        <li><a href="#">F</a></li>
                                        <li><a href="#">G</a></li>
                                        <li><a href="#">H</a></li>
                                        <li><a href="#">I</a></li>
                                        <li><a href="#">J</a></li>
                                        <li><a href="#">K</a></li>
                                        <li><a href="#">L</a></li>
                                        <li><a href="#">M</a></li>
                                        <li><a href="#">N</a></li>
                                        <li><a href="#">O</a></li>
                                        <li><a href="#">P</a></li>
                                        <li><a href="#">Q</a></li>
                                        <li><a href="#">R</a></li>
                                        <li><a href="#">S</a></li>
                                        <li><a href="#">T</a></li>
                                        <li><a href="#">U</a></li>
                                        <li><a href="#">V</a></li>
                                        <li><a href="#">W</a></li>
                                        <li><a href="#">X</a></li>
                                        <li><a href="#">Y</a></li>
                                        <li><a href="#">Z</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-6 col-lg-4">
                                    <div class="staffCard media media-sm">
                                        <a class="media-left" href="javascript:;" style={{marginRight:"2em"}}>
                                            <img src={TempUrl} alt="" class="media-object rounded" style={{width:"6.5em", marginTop: "-2px"}}/>
                                        </a>
                                        <div class="media-body">
                                            <a href="" class="likeIc stsLiked">
                                                <i class="fa fa-heart"></i>
                                            </a>
                                            <h5 class="media-heading">Employee Name</h5>
                                            <p class="text-muted mb-0">Job Title</p>
                                            <div><a href="">Name@nvkgenesys.com </a></div>
                                            <div class="d-flex">
                                                <p>Office:<span>000.000.0000</span></p>
                                                <p class="ml-2 ml-md-4">Xt:<span>025</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="staffCard media media-sm">
                                        <a class="media-left" href="javascript:;" style={{marginRight:"2em"}}>
                                            <img src={TempUrl} alt="" class="media-object rounded" style={{width:"6.5em", marginTop: "-2px"}} />
                                        </a>
                                        <div class="media-body">
                                            <a href="" class="likeIc">
                                                <i class="fa fa-heart"></i>
                                            </a>
                                            <h5 class="media-heading">Employee Name</h5>
                                            <p class="text-muted mb-0">Job Title</p>
                                            <div><a href="">Name@nvkgenesys.com </a></div>
                                            <div class="d-flex">
                                                <p>Office:<span>000.000.0000</span></p>
                                                <p class="ml-2 ml-md-4">Xt:<span>025</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="staffCard media media-sm">
                                        <a class="media-left" href="javascript:;" style={{marginRight:"2em"}}>
                                            <img src={TempUrl} alt="" class="media-object rounded" style={{width:"6.5em", marginTop: "-2px"}}/>
                                        </a>
                                        <div class="media-body">
                                            <a href="" class="likeIc stsLiked">
                                                <i class="fa fa-heart"></i>
                                            </a>
                                            <h5 class="media-heading">Employee Name</h5>
                                            <p class="text-muted mb-0">Job Title</p>
                                            <div><a href="">Name@nvkgenesys.com </a></div>
                                            <div class="d-flex">
                                                <p>Office:<span>000.000.0000</span></p>
                                                <p class="ml-2 ml-md-4">Xt:<span>025</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="staffCard media media-sm">
                                        <a class="media-left" href="javascript:;" style={{marginRight:"2em"}}>
                                            <img src={TempUrl} alt="" class="media-object rounded"  style={{width:"6.5em", marginTop: "-2px"}}/>
                                        </a>
                                        <div class="media-body">
                                            <a href="" class="likeIc">
                                                <i class="fa fa-heart"></i>
                                            </a>
                                            <h5 class="media-heading">Employee Name</h5>
                                            <p class="text-muted mb-0">Job Title</p>
                                            <div><a href="">Name@nvkgenesys.com </a></div>
                                            <div class="d-flex">
                                                <p>Office:<span>000.000.0000</span></p>
                                                <p class="ml-2 ml-md-4">Xt:<span>025</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="staffCard media media-sm">
                                        <a class="media-left" href="javascript:;" style={{marginRight:"2em"}}>
                                            <img src={TempUrl} alt="" class="media-object rounded" style={{width:"6.5em", marginTop: "-2px"}} />
                                        </a>
                                        <div class="media-body">
                                            <a href="" class="likeIc stsLiked">
                                                <i class="fa fa-heart"></i>
                                            </a>
                                            <h5 class="media-heading">Employee Name</h5>
                                            <p class="text-muted mb-0">Job Title</p>
                                            <div><a href="">Name@nvkgenesys.com </a></div>
                                            <div class="d-flex">
                                                <p>Office:<span>000.000.0000</span></p>
                                                <p class="ml-2 ml-md-4">Xt:<span>025</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="staffCard media media-sm">
                                        <a class="media-left" href="javascript:;" style={{marginRight:"2em"}}>
                                            <img src={TempUrl} alt="" class="media-object rounded" style={{width:"6.5em", marginTop: "-2px"}}/>
                                        </a>
                                        <div class="media-body">
                                            <a href="" class="likeIc">
                                                <i class="fa fa-heart"></i>
                                            </a>
                                            <h5 class="media-heading">Employee Name</h5>
                                            <p class="text-muted mb-0">Job Title</p>
                                            <div><a href="">Name@nvkgenesys.com </a></div>
                                            <div class="d-flex">
                                                <p>Office:<span>000.000.0000</span></p>
                                                <p class="ml-2 ml-md-4">Xt:<span>025</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="staffCard media media-sm">
                                        <a class="media-left" href="javascript:;" style={{marginRight:"2em"}}>
                                            <img src={TempUrl} alt="" class="media-object rounded" style={{width:"6.5em", marginTop: "-2px"}}/>
                                        </a>
                                        <div class="media-body">
                                            <a href="" class="likeIc stsLiked">
                                                <i class="fa fa-heart"></i>
                                            </a>
                                            <h5 class="media-heading">Employee Name</h5>
                                            <p class="text-muted mb-0">Job Title</p>
                                            <div><a href="">Name@nvkgenesys.com </a></div>
                                            <div class="d-flex">
                                                <p>Office:<span>000.000.0000</span></p>
                                                <p class="ml-2 ml-md-4">Xt:<span>025</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="staffCard media media-sm">
                                        <a class="media-left" href="javascript:;" style={{marginRight:"2em"}}>
                                            <img src={TempUrl} alt="" class="media-object rounded"style={{width:"6.5em", marginTop: "-2px"}} />
                                        </a>
                                        <div class="media-body">
                                            <a href="" class="likeIc">
                                                <i class="fa fa-heart"></i>
                                            </a>
                                            <h5 class="media-heading">Employee Name</h5>
                                            <p class="text-muted mb-0">Job Title</p>
                                            <div><a href="">Name@nvkgenesys.com </a></div>
                                            <div class="d-flex">
                                                <p>Office:<span>000.000.0000</span></p>
                                                <p class="ml-2 ml-md-4">Xt:<span>025</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="staffCard media media-sm">
                                        <a class="media-left" href="javascript:;" style={{marginRight:"2em"}}>
                                            <img src={TempUrl} alt="" class="media-object rounded"  style={{borderRadius:"50%", width:"6.5em", marginTop: "-2px"}}/>
                                        </a>
                                        <div class="media-body">
                                            <a href="" class="likeIc stsLiked">
                                                <i class="fa fa-heart"></i>
                                            </a>
                                            <h5 class="media-heading">Employee Name</h5>
                                            <p class="text-muted mb-0">Job Title</p>
                                            <div><a href="">Name@nvkgenesys.com </a></div>
                                            <div class="d-flex">
                                                <p>Office:<span>000.000.0000</span></p>
                                                <p class="ml-2 ml-md-4">Xt:<span>025</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 text-md-right">
                                    {/* <button type="button" class="btn btn-primary btn-lg ml-3">Load More</button> */}
                                </div>
                            </div>
						</div>
					</div>
				</div>
			</div>
        </div>
    )
}
 }
 export default StaffDirectory
