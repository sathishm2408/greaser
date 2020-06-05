import React, { Component } from 'react'
import './Searchbar.css'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import Utilities from '../../Services/Utilities'

class Searchbar extends Component {

    render() {
        return (

            <Form>
                <InputGroup>
                    <InputGroup.Prepend>
                        <Utilities />
                    </InputGroup.Prepend>


                    <FormControl
                        placeholder="Search"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <Button type="submit"><i className="fas fa-search"></i></Button>
                </InputGroup>
            </Form>




        )
    }
}

export default Searchbar;