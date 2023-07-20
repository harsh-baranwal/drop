import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Users from '../components/Users'
import { getAllUser } from '../api/UserRequests'
import { useSelector } from 'react-redux'

const Followers = () => {
    const {user} = useSelector((state) => state.authReducer.authData)
    const [persons, setPersons] = useState([])

    useEffect(()=> {
        const fetchPersons = async() => {
            const {data} = await getAllUser();
            setPersons(data)
        };
        fetchPersons()
    }, [])

  return (
    <Layout page={'Follow'}>
        <Card>
            {persons.map((person, id) => {
                if (person._id !== user._id) return <Users person={person} key={id} />;
            })}
        </Card>
    </Layout>
  )
}

export default Followers