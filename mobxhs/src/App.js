import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import DefaultContext from "./index";

const App = observer(() => {
    const loadingStore = useContext(DefaultContext)

    const handleLoad = () => {
        loadingStore.setIsLoadingStarted(true)
        loadingStore.setIsLoading(true)
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then(json => {
                if (Math.random() < 0.3)
                    loadingStore.setData(null)
                else
                    loadingStore.setData(json)
            })
            .catch(_ => loadingStore.setIsLoading(false))
    }

    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}
             className="App">
            <button style={{width: "100px"}} onClick={handleLoad}>Получить данные</button>
            {
                loadingStore.isLoadingStarted
                    ? loadingStore.isLoading
                        ? <img
                            width="200px"
                            src="https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM="
                            alt="loading"/>
                        : loadingStore.data === null
                            ? <><div>Error happened!</div>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQcx9hsPoGtt65myBXM7zJcVpL0GYMLNv_SIXPM8QBw&s"
                                    alt="error"/></>
                            : loadingStore.data.map(i => (
                                <div>{i.title}</div>
                            ))
                    : <></>
            }
        </div>
    );
})

export default App;
