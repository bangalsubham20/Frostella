import mysql.connector

try:
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Subham@99",
        database="frostella_db"
    )
    cursor = conn.cursor()
    
    updates = [
        ("Chocolate Truffle", "/images/chocolate_truffle.png"),
        ("Vanilla Buttercream", "/images/pineapple_cake.png"),
        ("Red Velvet Cupcake", "/images/cupcakes.png"),
        ("Custom Anniversary Base", "/images/red_velvet.png"),
        ("Blueberry Bliss", "/images/chocolate_truffle.png"),
        ("Theme Party Cupcakes (Box of 6)", "/images/cupcakes.png")
    ]
    
    for name, url in updates:
        cursor.execute("UPDATE Products SET image_url = %s WHERE name = %s", (url, name))
    
    conn.commit()
    print("Database updated successfully with real image paths.")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'conn' in locals() and conn.is_connected():
        cursor.close()
        conn.close()
