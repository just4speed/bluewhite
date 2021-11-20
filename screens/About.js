import React from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Input, Text, Button } from 'react-native-elements';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp
} from "react-native-responsive-screen";

const About = () => {
    return(
        <SafeAreaView>
            <ScrollView vertical>
                <View style={{ paddingHorizontal: wp("7%"), paddingVertical: hp("5%") }}>
                    <Text style={styles.description}>מי שגר במרכז תל אביב יודע - מצב החניות לא משתפר עם הזמן. עוד לפני חמש שנים המצב באזורנו היה סביר פחות או יותר אך הזמנים האלה תמו, נכון להיום חיפוש אחרי כחול לבן יכול לקחת גם יותר משעה של סיבובים מסביב לבית ואין שום העדפה בין תושבי האזור לבין המבקרים במסעדות, לבין הילדים שמגיעים לים לבין העובדים ומבקרים במלונות וקניונים ועוד ועוד ועוד כל אלה שמגיעים עם הרכבים הפרטים שלהם מכל הארץ ותופסים חניות מתחת לבלוק שלי ושלך. אז מה אפשר לעשות? בואו נשתף חניות! </Text>
                    <Text h4 style={styles.heading}>מה זה שיתוף חניות בעזרת המפה?</Text>
                    <Text style={styles.description}>בעזרת האפליקציה ניתן לראות על גבי המפה חניות שהתפנו לפני רגע או אלה שעומדות להתפנות בקרוב. אם כולנו יחד נעדכן פינויים נוכל לעזור אחד לשני.</Text>
                    <Text h4 style={styles.heading}>איך זה עובד</Text>
                    <Text style={styles.description}>די פשוט. כל פעם כאשר אנו רוצים לפנות חניה יש לכתוב כתובת החניה וזמן הפינוי בקבוצה של המערכת, לדוגמה - "בוגרשוב 55 מחר שמונה בבוקר". מיד לאחר השליחה יופיע סמן על גבי מפת המערכת כך שמי שמעוניין לחנות יוכל לראות איפה ומתי הולכת להתפנות חניה.</Text>
                    <Text h4 style={styles.heading}>יתרונות המערכת ביחס לקבוצות חנייה</Text>
                    <View style={{ flexDirection: "column" }}>
                        <View style={styles.listItem}>
                            <View style={styles.circle}></View>
                            <Text style={{ fontSize: wp("4.5%") }}>ניתן לראות על גבי המפה את מיקומם של החניות שמתפנות או עומדות להתפנה בקרוב</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.circle}></View>
                            <Text style={{ fontSize: wp("4.5%") }}>ניתן לראות על גבי המפה את מיקומם של החניות שמתפנות או עומדות להתפנה בקרוב</Text>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.circle}></View>
                            <Text style={{ fontSize: wp("4.5%") }}>ניתן לראות על גבי המפה את מיקומם של החניות שמתפנות או עומדות להתפנה בקרוב</Text>
                        </View>
                    </View>
                    <Text h4 style={styles.heading}>מה עלי לעשות כדי להתחיל להשתמש במערכת</Text>
                    <Text style={styles.description}>במידה ותרצה לקחת חלק בפרויקט אליך לעשות שני דברים:</Text>
                    <Text style={[styles.description, { fontWeight: "bold" }]}>למלא<TouchableOpacity><Text style={[styles.description, styles.link]}> את הטופס </Text></TouchableOpacity>ע"מ שנוכל לצרף אותך לקבוצה</Text>
                    <Text style={[styles.description, { marginVertical: hp("1.5%") }]}> *במידה ויש לך אפשרות לתרום לפרויקט בדרך כלשהי או שיש לך רעיון לשיפור אנא פנה אלי במייל <Text style={{ fontWeight: "bold" }}>simonbor@gmail.com</Text></Text>
                    <Text style={styles.description}> *נכתב בלשון זכר מטעמי נוחות בלבד אך מיועד לנשים וגברים כאחד.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    heading: {
        marginTop: hp("3%"),
        marginBottom: hp("2%")
    },
    description: {
        lineHeight: wp("8%"),
        fontSize: wp("4.5%")
    },
    listItem: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: hp("2%")
    },
    circle: {
        width: wp("2%"),
        height: wp("2%"),
        backgroundColor: "#2288DC",
        borderRadius: 50,
        marginHorizontal: wp("2%")
    },
    link: {
        color: "#2288DC",
        fontWeight: "bold",
    }
});

export default About;