import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper';

const RetrieveTaskDetail = (route, navigation) => {
    // // ----------Localization hooks & Router Hooks-------------
    // null


    // // ----------Props/route & context & ref ------------------------------
    const { task } = route.route.params;


    // // ----------redux store useDispatch & useSelector --------------------


    // // ----------hooks useState--------------------------------------------------


    const { id, date, title, description, technology, library } = task
    let libraryList = []
    if (library.redux === true) {
        libraryList.push("redux")
    }
    if (library.saga === true) {
        libraryList.push("saga")
    }
    if (library.numpy === true) {
        libraryList.push("numpy")
    }
    if (library.pandas === true) {
        libraryList.push("pandas")
    }
    return (
        <React.Fragment>
            <View>
                <Text>RetrieveTaskDetail</Text>
            </View>
            <View>
                {task &&
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Content</DataTable.Title>
                            <DataTable.Title>Value</DataTable.Title>
                        </DataTable.Header>
                        <DataTable.Row>
                            <DataTable.Title>Id</DataTable.Title>
                            <DataTable.Cell>{id}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title>Title</DataTable.Title>
                            <DataTable.Cell>{title}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title>Date</DataTable.Title>
                            <DataTable.Cell>{date}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title>Description</DataTable.Title>
                            <DataTable.Cell>{description}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title>UI Technology</DataTable.Title>
                            <DataTable.Cell>{technology.uiTech}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title>Backend Technology</DataTable.Title>
                            <DataTable.Cell>{technology.backEndTech}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title>Libray</DataTable.Title>
                            <DataTable.Cell>{libraryList.join(", ")}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                }
            </View>
        </React.Fragment>
    )
}

export default RetrieveTaskDetail

const styles = StyleSheet.create({})
