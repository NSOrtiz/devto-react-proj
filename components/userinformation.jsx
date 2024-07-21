const LocationArray = ["EE. UU.", "Germany", "Finland", "Singapore", "Canada", "Netherlands", "United Kingdom", "New Zealand", "Australia", "Mexico", "Colombia", "Brazil", "Peru", "Chile" ];
const EducationArray = ["Master of Science in Interactive Technologies Programming", "M.Sc. Artificial intelligence", "M.Sc. Data science", "Master's degree in computer sciences", "Systems and Telecommunications Engineering", "Informatics Engineering", "Software Engineering", "Technology in Computer Systems Development", "Technology in Mobile and Web Application Design"];
const WorkArray = ["Web designer", "Cybersecurity specialist", "Systems technician", "Computer systems analyst", "Systems architect", "Big data specialist", "Data analyst", "Full Stack developer", "QA Tester"  ];

export default function UserInfo(){

    function randomData(array){
        let pos=array.length;
        let data=Math.floor(Math.random() * pos);
        return array[data]
    }


    return(
        <section>

            <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-600">LOCATION</h3>
                <p className="text-sm text-gray-600">{randomData(LocationArray)}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-600">EDUCATION</h3>
                <p className="text-sm text-gray-600">{randomData(EducationArray)}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-600">WORK</h3>
                <p className="text-sm text-gray-600">{randomData(WorkArray)}</p>
            </div>

        </section>
    )
}