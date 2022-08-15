import { Text, useTheme } from '@nextui-org/react'
import React from 'react'

const Navbar = () => {

    const {theme} = useTheme()

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0px 20px',
        marginBottom: '20px',
        backgroundColor: theme?.colors.backgroundContrast.value
    }}>
        <Text h2>B</Text>
        <Text h3>iblioteca</Text>
        
    </div>
  )
}

export default Navbar