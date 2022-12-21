const paginate = (followers) => {
    const itemsPerPage = 12
    const pages = Math.ceil(followers.length/itemsPerPage)

    const paginatedFollowers = Array.from({length:pages},(_,index)=>{
        const start = index * itemsPerPage
        return followers.slice(start, start + itemsPerPage)
    })

    // console.log(paginatedFollowers)
    return paginatedFollowers

}

export default paginate
