import Pagination from 'react-bootstrap/Pagination';

function Paginate({toltalNumberOfPages,getList,filterRole,srchValue}:any) {
    const totalPagesArray:any = Array.from({ length: toltalNumberOfPages })
    function getPage(e:any) {
        console.log(e.target.text);
        getList({pageNumber:e.target.text,userName:srchValue,groups:filterRole});
    }
        
  return (
    <Pagination onClick={getPage} >

      {totalPagesArray.map((_,idx:number) => (<Pagination.Item key={idx}>{idx+1}</Pagination.Item>))}


    </Pagination>
  );
}

export default Paginate;