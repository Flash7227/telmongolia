var baseurl = process.env.BASEURL;

export async function getCaraosel() {
    const res = await fetch(baseurl + '/api/2/coverimg?type=resident');
    const data = await res.json()
    return data['data'];
}