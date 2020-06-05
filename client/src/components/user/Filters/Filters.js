import React, { Component } from 'react';
import './Filters.css';
import Sort from '../Sort/Sort';


class Filters extends Component {
    state = {
        showDiv: false,
        showDiv1: true,
        showDiv2: false,
        showDiv3:false,
    }
    onClickDiv = () => {
        return (
            this.setState({ showDiv: !this.state.showDiv }),
            this.setState({ showDiv1: !this.state.showDiv1 })

        )
    }
    onMobileDivClick = () => {
        return (
            this.setState({ showDiv2: !this.state.showDiv2 })
        )
    }

    onMobileDivClick1 = () =>{
        return(
            this.setState({ showDiv3: !this.state.showDiv3 })
        )
    }
    render() {
        console.log(this.state.showDiv)
        return (
                     
                 <div className="entireDiv">
                <button className="filterButton" onClick={this.onMobileDivClick}><i class="fas fa-filter"></i>Filters</button>
                <Sort />
                
                <div className={`filtersMainDiv ${this.state.showDiv2 ? 'show' : 'hide'}`}>
                    <div className="filterIcon">
                        <i class="fas fa-filter"></i>
                         Filters
                     </div>
                    <div className="firstFiltersDiv">
                        <input type="checkbox" id="Men's Fashion" name="Men's Fashion" value="men's Fashion" />
                        <label for="Men's Fashion"> Men's Fashion</label><br></br>


                        <input type="checkbox" id="Women's Fashion" name="Women's Fashion" value="Women's Fashion" />
                        <label for="Women's Fashion"> Women's Fashion</label><br></br>


                        <input type="checkbox" id="Electronics" name="Electronics" value="Electronics" />
                        <label for="Electronics"> Electronics</label><br></br>


                        <input type="checkbox" id="Books" name="Books" value="Books" />
                        <label for="Books"> Books</label><br></br>


                        <input type="checkbox" id="Beauty" name="Beauty" value="Beauty" />
                        <label for="Beauty"> Beauty</label><br></br>
                    </div>

                    <div onClick={this.onClickDiv} className={`seeMoreDiv ${this.state.showDiv1 ? 'show' : 'hide'}`}>See More
                    <i class="fas fa-caret-down"></i></div>


                    <div className={`secondFiltersDiv ${this.state.showDiv ? 'show' : 'hide'}`}>
                        <input type="checkbox" id="Cars" name="Cars" value="Cars" />
                        <label for="Cars"> Cars</label><br></br>


                        <input type="checkbox" id="Movies" name="Movies" value="Movies" />
                        <label for="Movies"> Movies</label><br></br>


                        <input type="checkbox" id="Toys" name="Toys" value="Toys" />
                        <label for="Toys"> Toys</label><br></br>

                        <input type="checkbox" id="Sports" name="Sports" value="Sports" />
                        <label for="Sports">Sports</label>
                        <div onClick={this.onClickDiv} className={`seeLessDiv ${this.state.showDiv ? 'show' : 'hide'}`}>See Less
                         <i class="fas fa-sort-up"></i>
                        </div>
                        
                    </div>
                    <div className={`sortMainDiv ${this.state.showDiv3 ? 'show' : 'hide'}`}>
                        <div className="sortNameDiv">Sort by</div>
                        <div className="sortSubDiv">
                    <input type="checkbox" id="Relevance" name="Relevance" value="Relevance" />
                        <label for="Relevance"> Relevance</label><br></br>
                        <input type="checkbox" id="Price(Lowest First)" name="Price(Lowest First)" value="Price(Lowest First)" />
                        <label for="Price(Lowest First)"> Price(Lowest First)</label><br></br>
                        <input type="checkbox" id="Price(Highest First)" name="Price(Highest First)" value="Price(Highest First)" />
                        <label for="Price(Highest First)"> Price(Highest First)</label><br></br>
                        <input type="checkbox" id="What's New" name="What's New" value="What's New" />
                        <label for="What's New"> What's New</label><br></br>
                        </div>
                        </div>
                </div>
                
            </div>
            
            

              
            



        )
    }
}

export default Filters;