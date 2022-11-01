

export default function Header(props) {
  return (
    <div className='grid w-full shadow-2xl place-items-center'>
      <div className="mx-auto p-8 px-7 ">
        <div className="text-8xl font-audimat text-transparent bg-clip-text bg-gradient-to-br from-ldgdcol1 to-ldgdcol2">
        {/* <img src={ld} className="mx-auto max-h-30" alt="logo" /> */}
        Innovate Faster,
        </div>
        <div className="text-8xl">
          <p><span className="font-audimat text-transparent bg-clip-text bg-gradient-to-br from-ldgdcol1 to-ldgdcol2">Deploy Fearlessly.</span></p>
        </div>      
      </div>
    </div>
  );
}
