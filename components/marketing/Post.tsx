import React from 'react'

export const Post = ({ publication }: any) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
        <div className="border w-full lg:w-9/12 bg-white mt-6 rounded-2xl p-4">
            <div className="flex items-center justify-between">
                <div className="gap-3.5	flex items-center ">
                    <img src="https://images.unsplash.com/photo-1617077644557-64be144aa306?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" className="object-cover bg-yellow-500 rounded-full w-10 h-10" />
                    <div className="flex flex-col">
                        <b className="mb-2 capitalize">sofia müller</b>
                        <time dateTime="06-08-21" className="text-gray-400 text-xs">06 August at 09.15 PM
                        </time>
                    </div>
                </div>
                <div className="bg-gray-100	rounded-full h-3.5 flex	items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="34px" fill="#92929D">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                            d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                </div>
            </div>
            <div className="whitespace-pre-wrap mt-7">{ publication.content }</div>
            <div className="mt-5 flex gap-2	 justify-center border-b pb-4 flex-wrap	">
                {
                    publication.images.map(( image: string, index: number ) => (
                        <img key={ index } src={ image } className="bg-red-500 rounded-2xl w-1/3 object-cover h-60 flex-auto" alt="photo"/>
                    ))
                }

            </div>
            
                <div className=" h-16 border-b  flex items-center justify-around	">
                    <div className="flex items-center	gap-3	">
                        <svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="?-Social-Media" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Square_Timeline" transform="translate(-312.000000, -746.000000)">
                                    <g id="Post-1" transform="translate(280.000000, 227.000000)">
                                        <g id="Post-Action" transform="translate(0.000000, 495.000000)">
                                            <g transform="translate(30.000000, 21.000000)" id="Comment">
                                                <g>
                                                    <g id="ic_comment-Component/icon/ic_comment">
                                                        <g id="Comments">
                                                            <polygon id="Path" points="0 0 24 0 24 25 0 25"></polygon>
                                                            <g id="iconspace_Chat-3_25px"
                                                                transform="translate(2.000000, 3.000000)" fill="#92929D">
                                                                <path
                                                                    d="M10.5139395,15.2840977 L6.06545155,18.6848361 C5.05870104,19.4544672 3.61004168,18.735539 3.60795568,17.4701239 L3.60413773,15.1540669 C1.53288019,14.6559967 0,12.7858138 0,10.5640427 L0,4.72005508 C0,2.11409332 2.10603901,0 4.70588235,0 L15.2941176,0 C17.893961,0 20,2.11409332 20,4.72005508 L20,10.5640427 C20,13.1700044 17.893961,15.2840977 15.2941176,15.2840977 L10.5139395,15.2840977 Z M5.60638935,16.5183044 L9.56815664,13.4896497 C9.74255213,13.3563295 9.955971,13.2840977 10.1754888,13.2840977 L15.2941176,13.2840977 C16.7876789,13.2840977 18,12.0671403 18,10.5640427 L18,4.72005508 C18,3.21695746 16.7876789,2 15.2941176,2 L4.70588235,2 C3.21232108,2 2,3.21695746 2,4.72005508 L2,10.5640427 C2,12.0388485 3.1690612,13.2429664 4.6301335,13.28306 C5.17089106,13.297899 5.60180952,13.7400748 5.60270128,14.2810352 L5.60638935,16.5183044 Z"
                                                                    id="Path"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <div className="text-sm	">10 Comments</div>
                    </div>
                    <div className="flex items-center	gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd" />
                        </svg>
                        <div className="text-sm">5 Likes</div>
                    </div>
                    <div className="flex items-center	gap-3">
                        <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="?-Social-Media" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Square_Timeline" transform="translate(-636.000000, -745.000000)">
                                    <g id="Post-1" transform="translate(280.000000, 227.000000)">
                                        <g id="Post-Action" transform="translate(0.000000, 495.000000)">
                                            <g transform="translate(30.000000, 21.000000)" id="Share">
                                                <g transform="translate(325.000000, 1.000000)">
                                                    <g id="ic_Share-Component/icon/ic_Share">
                                                        <g id="Share">
                                                            <circle id="Oval" cx="12" cy="12" r="12"></circle>
                                                            <g id="Group-24-Copy"
                                                                transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) translate(1.000000, 1.000000)"
                                                                fill="#92929D">
                                                                <path
                                                                    d="M4,0 C6.209139,0 8,1.790861 8,4 C8,4.1291298 7.99388117,4.25683047 7.98191762,4.38282788 L15.371607,7.98470389 C16.0745405,7.37145444 16.9938914,7 18,7 C20.209139,7 22,8.790861 22,11 C22,13.209139 20.209139,15 18,15 C16.9572434,15 16.0076801,14.6009919 15.2956607,13.9473263 L7.98384745,17.6380767 C7.99453877,17.7572882 8,17.8780063 8,18 C8,20.209139 6.209139,22 4,22 C1.790861,22 0,20.209139 0,18 C0,15.790861 1.790861,14 4,14 C5.37147453,14 6.58173814,14.690226 7.30236849,15.7422555 L14.2017356,12.2577203 C14.0708451,11.8622268 14,11.4393868 14,11 C14,10.5276126 14.0818865,10.0743509 14.2322392,9.65363512 L7.29274641,6.27172794 C6.57099412,7.31588608 5.36538874,8 4,8 C1.790861,8 0,6.209139 0,4 C0,1.790861 1.790861,0 4,0 Z M4,16 C2.8954305,16 2,16.8954305 2,18 C2,19.1045695 2.8954305,20 4,20 C5.1045695,20 6,19.1045695 6,18 C6,16.8954305 5.1045695,16 4,16 Z M18,9 C16.8954305,9 16,9.8954305 16,11 C16,12.1045695 16.8954305,13 18,13 C19.1045695,13 20,12.1045695 20,11 C20,9.8954305 19.1045695,9 18,9 Z M4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 Z"
                                                                    id="Combined-Shape"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <div className="text-sm">Share</div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <img src="https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"  className="bg-yellow-500 rounded-full w-10 h-10 object-cover border"/>
                    <div className="flex items-center	justify-between	 bg-gray-50 h-11 w-11/12 border rounded-2xl	 overflow-hidden px-4 ">
                        <input type="text" className="h-full w-full bg-gray-50 outline-none " placeholder="Write your comment..." name="comment"/>
                    </div>
                </div>
        </div>
    </div>
  )
}
